import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AngularFireAuth } from '@angular/fire/compat/auth'
// import { GoogleAuthProvider } from 'firebase/auth'
// import { getAuth } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // private fireauth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar) {
    }
    
  //   auth = getAuth()
  // // Open Snackbar error message
  // snackbarError(errorCode: string) {
  //   let errorMessage: string = 'Something went wrong'
  //       switch (errorCode) {
  //         case 'auth/invalid-email':
  //         case 'auth/wrong-password':
  //           errorMessage = 'Invalid email and/or password'
  //           break
  //         case 'auth/user-not-found':
  //           errorMessage = 'Profile does not exist'
  //           break
  //         case 'auth/email-already-in-use':
  //           errorMessage = 'Email is already in use'
  //           break
  //         case 'auth/weak-password':
  //           errorMessage = 'Password must contain at least 6 characters'
  //           break
  //         default:
  //           errorMessage = 'Something went wrong'
  //           break
  //       }
  //       this.snackbar.open(errorMessage, 'DISMISS')
  // }

//   // Sign in
//   signIn(email: string, password: string) {
//     this.fireauth.signInWithEmailAndPassword(email, password)
//       .then(() => {
//         localStorage.setItem('token', 'true')
//         this.router.navigate(['dashboard'])
//         alert('Login Successful')
//       })
//       .catch(error => {
//         this.snackbarError(error.code)
//       })
//   }
//   // Sign in with Google
//   signInWithGoogle() {
//     return this.fireauth.signInWithPopup(new GoogleAuthProvider)
//     .then(res => {
//       localStorage.setItem('token', JSON.stringify(res.user?.uid))
//       this.router.navigate(['dashboard'])
//     })
//     .catch(error => {
//       this.snackbarError(error.code)
//     })

//   }
//   // Register
//   register(email: string, password: string) {
//     this.fireauth.createUserWithEmailAndPassword(email, password)
//       .then(() => {
//         this.snackbar.open('Registration Successful')
//         this.router.navigate(['login'])
//       })
//       .catch(error => {
//         this.snackbarError(error.code)
//       })
//   }
//   // Sign out
//   logout() {
//     this.fireauth.signOut()
//       .then(() => {
//         localStorage.removeItem('token')
//         this.router.navigate(['login'])
//       })
//       .catch(error => {
//         this.snackbarError(error.code)
//       })
//   }
}
