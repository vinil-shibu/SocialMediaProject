import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { AppComponent } from 'src/app/app.component';
import { catchError } from 'rxjs';
import { FirebaseTSAuth } from 'firebasets/firebaseTSAuth/firebaseTSAuth';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  comments: Comment[]=[];
  auth = new FirebaseTSAuth();

  constructor(@Inject(MAT_DIALOG_DATA) private postId:string) { }

  ngOnInit(): void {
    this.getcomments();
  }

  isCommentCreator(comment:Comment){
    
    try{      
      return comment.creatorId == this.auth.getAuth().currentUser?.uid;
    }
    catch (err){
      return console.warn(err);
    }
  }

  getcomments(){
    this.firestore.listenToCollection(
      {
        name: "Post Comments",
        path: ["Posts",this.postId,"PostComments"],
        where:[new OrderBy("timeStamp","desc")],
        onUpdate: (result) => {
          console.warn("size",result.size);
          
            result.docChanges().forEach(
              postCommentDoc =>{
                if(postCommentDoc.type == "added"){
                  this.comments.unshift(<Comment>postCommentDoc.doc.data());
                }
              }
            );
        },
      }
    );
  }

  onSendClick(commentInput:HTMLInputElement){
    if(!(commentInput.value.length >0)) return;
    this.firestore.create(
      {
        path: ["Posts", this.postId, "PostComments"],
        data:{
          comment:commentInput.value,
          creatorId:AppComponent.getUserDocument()!.userId,
          creatorName:AppComponent.getUserDocument()!.publicName,
          timeStamp: FirebaseTSApp.getFirestoreTimestamp(),
        },
        onComplete: (docId) =>{
          commentInput.value="";
        }
      }
    );
  }

}

export interface Comment {
  creatorId:string;
  creatorName:string;
  comment:string;
  timeStamp:firebase.default.firestore.Timestamp
}