import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebaseTSAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() show: boolean = false;

  firestore : FirebaseTSFirestore;
  auth : FirebaseTSAuth;

  constructor(private router:Router) { 
    this.firestore  = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }

  onContinueClick(nameInput:HTMLInputElement, descriptionInput:HTMLTextAreaElement){
    let name = nameInput.value;
    let description = descriptionInput.value;
    this.firestore.create(
      {
        path:["Users", `${this.auth.getAuth().currentUser?.uid}`],
        data:{
          publicName:name,
          description:description
        },
        onComplete: (docId) =>{
          alert('Profile Created');
          nameInput.value="";
          descriptionInput.value="";
        },
        onFail: () =>{

        }
      }
    );
  }
}
