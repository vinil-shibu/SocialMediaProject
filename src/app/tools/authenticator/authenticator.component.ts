import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state= AuthenticatorCompState.LOGIN;
  head:string|undefined='Login';
  buttonClick:string|undefined='Login';
  constructor() { }

  ngOnInit(): void {
  }

  onForgetPasswordClick(){
    this.buttonClick='ForgetPassword';
    this.head='Forgot Password'
    // this.state=AuthenticatorCompState.FORGOT_PASSWORD;
  }
  
  OnCreateAccountClick(){
    this.buttonClick='CreateAccount';
    this.head='Register';
    // this.state=AuthenticatorCompState.REGISTER;
  }
  
  onLoginClick(){
    this.buttonClick='Login';
    this.head='Login';
    // this.state=AuthenticatorCompState.LOGIN;
  }

}

export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
