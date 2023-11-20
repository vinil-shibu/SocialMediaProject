import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebaseTSAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  // state= AuthenticatorCompState.LOGIN;
  head: string= 'Login';
  buttonClick: string = 'Login';
  firebasetsAuth: FirebaseTSAuth;
  constructor(private bottomSheetRef: MatBottomSheetRef,private router:Router) {
    this.firebasetsAuth = new FirebaseTSAuth;
  }

  ngOnInit(): void {
  }

  onResetClick(resetEmail: HTMLInputElement){
    let email= resetEmail.value;
    if(this.isNotEmpty(email)){
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email:email,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss()
            resetEmail.value="";
          },
        }
      );
    }
  }

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    let email = loginEmail.value;
    let password = loginPassword.value;
    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith(
        {
          email:email,
          password:password,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss()
            loginEmail.value="";
            loginPassword.value="";
          },
          onFail: (err) => {
            alert(err)
          },
        }
      );
    }
  }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerComfirmPassword: HTMLInputElement) {
    let email = registerEmail.value;
    let password = registerPassword.value;
    let comfirmPssword = registerComfirmPassword.value;

    if (
      this.isNotEmpty(email) && this.isNotEmpty(password) &&
      this.isNotEmpty(comfirmPssword) && this.isMatching(password, comfirmPssword)
    ) {
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss();
          },
          onFail: (err) => {
            alert('Failed to Create Account')
          },
        });
    }
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0
  }

  isMatching(pass1: string, pass2: string) {
    return pass1 == pass2
  }

  onForgetPasswordClick() {
    this.buttonClick = 'ForgetPassword';
    this.head = 'Forgot Password'
    // this.state=AuthenticatorCompState.FORGOT_PASSWORD;
  }

  OnCreateAccountClick() {
    this.buttonClick = 'CreateAccount';
    this.head = 'Register';
    // this.state=AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.buttonClick = 'Login';
    this.head = 'Login';
    // this.state=AuthenticatorCompState.LOGIN;
  }

}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
