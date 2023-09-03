import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "src/environments/environment";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, writeBatch, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { TaskList } from '../task-dashboard/models/taskList.interface';
import { Task } from '../task-dashboard/models/task.interface';

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    // Redirect to proper page based on token
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard'])
      // this.getTaskLists()
    }
    else {
      this.router.navigate(['login'])
    }
  }

  uid: any = localStorage.getItem('token')
  taskLists: TaskList[] = [
    {
        id: "",
        listName: "",
        tasks: []
    }
  ]

  // Open Snackbar error message
  snackbarError(errorCode: string) {
    let errorMessage: string = 'Something went wrong'
        switch (errorCode) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
            errorMessage = 'Invalid email and/or password'
            break
          case 'auth/user-not-found':
            errorMessage = 'Profile does not exist'
            break
          case 'auth/email-already-in-use':
            errorMessage = 'Email is already in use'
            break
          case 'auth/weak-password':
            errorMessage = 'Password must contain at least 6 characters'
            break
          default:
            errorMessage = 'Something went wrong'
            break
        }
        this.snackbar.open(errorMessage, 'DISMISS')
  }

  // Logging in
  async createNewUserTree(userId: any, userEmail: any) {
    try {
      const userDocSnapshot = await getDoc(doc(db, 'users', userId))
      if (!userDocSnapshot.exists()) {
        const batch = writeBatch(db)
        // user document
        const userDocRef = doc(collection(db, 'users'), userId)
        batch.set(userDocRef, {email: userEmail})
        // taskList document
        const taskListDocRef = doc(collection(userDocRef, 'taskLists'))
        batch.set(taskListDocRef, {name: 'Your first task list', timestamp: serverTimestamp()})
        // task document
        const taskDocRef = doc(collection(taskListDocRef, 'tasks'))
        batch.set(taskDocRef, {title: 'Your first task', done: false, timestamp: serverTimestamp()})
        // commit batch
        await batch.commit()
      }
    }
    catch(error: any) {
      this.snackbar.open(error, 'DISMISS')
    }
  }
  createUser(email: string, password: string) {
    this.snackbar.open('Creating new profile...', '',{duration: 3000})
    createUserWithEmailAndPassword(auth, email, password)
      .then(cred => {
        this.createNewUserTree(cred.user.uid, cred.user.email)
        this.snackbar.open('Registration Successful', '', {duration: 3000})
      })
      .then(() => {
        this.router.navigate(['login'])
      })
      .catch(error => {
        this.snackbar.open(error, 'DISMISS')
      })
  }
  async signIn(email: string, password: string) {
    let uid
    let uemail
    this.snackbar.open('Signing in...', '', {duration: 3000})
    await signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        localStorage.setItem('token', cred.user.uid)
        uid = cred.user.uid
        uemail = cred.user.email
        this.snackbar.open('Sign in Successful', '', {duration: 3000})
      })
      .catch(error => {
        this.snackbarError(error.code)
      })
    await this.createNewUserTree(uid, uemail)
    await this.getTaskLists()
    console.log(localStorage.getItem('token'))
    this.router.navigate(['dashboard'])
  }
  async signInWithGoogle() {
    let uid
    let uemail 
    await signInWithPopup(auth, new GoogleAuthProvider)
      .then(cred => {
        localStorage.setItem('token', cred.user.uid)
        uid = cred.user.uid
        uemail = cred.user.email
      })
      .catch(error => {
        this.snackbarError(error.code)
      })
    await this.createNewUserTree(uid, uemail)
    await this.getTaskLists()
    this.router.navigate(['dashboard'])
  }
  logout() {
    this.snackbar.open('Signing out...', '', {duration: 3000})
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token')
        this.snackbar.open('Signed Out', '', {duration: 3000})
        this.router.navigate(['login'])
        this.taskLists = []
      })
      .catch(error => {
        this.snackbarError(error.code)
      })
  }
  
  // TaskLists
  async getTaskLists() {
    const uid: any = localStorage.getItem('token')
    const colRef = collection(db, 'users', uid, 'taskLists')
    const q = query(colRef, orderBy('timestamp'))
    await getDocs(q)
      .then(snapshot => {
        this.taskLists = []
        snapshot.docs.forEach((doc) => {
          const tasksColRef = collection(db, 'users', uid, 'taskLists', doc.id, 'tasks')
          let tasks: Task[] = []
          getDocs(tasksColRef)
            .then(taskSnapshot => {
              taskSnapshot.docs.forEach((taskDoc) => {
                tasks.push({id: taskDoc.id, title: taskDoc.data()['title'], done: taskDoc.data()['done']})
              })
            })
            .catch(error => {
              console.log(error)
            })
          this.taskLists.push({id: doc.id, listName: doc.data()['name'], tasks: tasks})
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  async createNewTaskList() {
    try {
      const userId: any = localStorage.getItem('token')
      const batch = writeBatch(db)
      // taskList document
      const taskListDocRef = doc(collection(db, 'users', userId, 'taskLists'))
      batch.set(taskListDocRef, {name: 'Your new task list', timestamp: serverTimestamp()})
      // task document
      const taskDocRef = doc(collection(taskListDocRef, 'tasks'))
      batch.set(taskDocRef, {title: 'Your first task', done: false, timestamp: serverTimestamp()})
      // commit batch
      await batch.commit()
      await this.getTaskLists()
    }
    catch(error: any) {
      console.log(error)
    }
  }
  async deleteTaskList(docId: any) {
    const uid: any = localStorage.getItem('token')
    const docRef = doc(db, 'users', uid, 'taskLists', docId)
    try {
      await deleteDoc(docRef)
      await this.getTaskLists()
    }
    catch(error: any) {
      console.log(error)
    }
  }
  async editTaskList(docId: any, taskListNewName: string) {
    const uid: any = localStorage.getItem('token')
    const docRef = doc(db, 'users', uid, 'taskLists', docId)
    try {
      await updateDoc(docRef, {
        name: taskListNewName
      })
      await this.getTaskLists()
    }
    catch(error: any) {
      console.log(error)
    }
  }

  // Tasks
  async createNewTask(taskListId: string, taskTitle: string) {
    try {
      const userId: any = localStorage.getItem('token')
      await addDoc(collection(db, 'users', userId, 'taskLists', taskListId, 'tasks'), {title: taskTitle, done: false, timestamp: serverTimestamp()})
      console.log('A')
      await this.getTaskLists()
      console.log('B')
    }
    catch(error: any) {
      console.log(error)
    }
  }
  async deleteTask(taskListId: string, taskId: string) {
    const uid: any = localStorage.getItem('token')
    const docRef = doc(db, 'users', uid, 'taskLists', taskListId, 'tasks', taskId)
    try {
      await deleteDoc(docRef)
      await this.getTaskLists()
    }
    catch(error: any) {
      console.log(error)
    }
  }
  async changeTaskDone(taskListId: string, taskId: string, taskDone: boolean) {
    const uid: any = localStorage.getItem('token')
    const docRef = doc(db, 'users', uid, 'taskLists', taskListId, 'tasks', taskId)
    try {
      await updateDoc(docRef, {
        done: taskDone
      })
      await this.getTaskLists()
    }
    catch(error: any) {
      console.log(error)
    }
  }
  async editTaskTitle(taskListId: string, taskId: string, taskNewTitle: string) {
    const uid: any = localStorage.getItem('token')
    const docRef = doc(db, 'users', uid, 'taskLists', taskListId, 'tasks', taskId)
    try {
      await updateDoc(docRef, {
        title: taskNewTitle
      })
      await this.getTaskLists()
    }
    catch(error: any) {
      console.log(error)
    }
  }
}