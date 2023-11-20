import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"authenticator",
    component:AuthenticatorComponent
  },
  {
    path:"emailVerification",
    component:EmailVerificationComponent
  },
  {
    path:"postfeed",
    component:PostFeedComponent
  },
  {
    path:"createpost",
    component:CreatePostComponent
  },
  {
    path:"**",
    component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
