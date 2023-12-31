import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebaseTSAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SocialMediaProject';
  auth = new FirebaseTSAuth();
  fireStore=new FirebaseTSFirestore();
  userHasProfile=true;
  private static userDocument: UsersDocument |undefined;

  constructor(private loginSheet: MatBottomSheet,private router:Router) {
    this.fireStore  = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();

    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user =>{
            },
            whenSignedOut :user =>{
              AppComponent.userDocument=undefined
              alert('Logged out');
            },
            whenSignedInAndEmailNotVerified : user =>{
              this.router.navigate(['emailVerification'])
            },
            whenSignedInAndEmailVerified : user =>{
              this.getUserProfile();
            },
            whenChanged : user =>{
              
            }
          }
        );
      }
    );
  }
  ngOnInit(): void {
    
  }

  public static getUserDocument(){
    return AppComponent.userDocument;
  }

  getUsername(){
    try{
      return AppComponent.userDocument?.publicName
    }
    catch(err){
      return console.warn("username Not fetched");
    }
  }

  getUserProfile(){
    this.fireStore.listenToDocument(
      {
        name:"Getting Document",
        path:["Users", `${this.auth.getAuth().currentUser?.uid}`],
        
        onUpdate:(result) => {  
          if(result.data){
            AppComponent.userDocument=<UsersDocument>result.data();
            this.userHasProfile = result.exists;
            AppComponent.userDocument.userId = this.auth.getAuth().currentUser!.uid;
          }
          if(this.userHasProfile){
            this.router.navigate(['postfeed']);
          }
        },
      }
    );
  }

  loggedIn(){
    return this.auth.isSignedIn();
  }

  onLogoutClick(){
    this.auth.signOut();
    this.router.navigate(['']);
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent)
  }
}





export interface UsersDocument{
  publicName:string,
  description:string,
  userId:string
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

