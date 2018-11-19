import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConvertToSpaces } from './shared/convert-to-spaces.pipe';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthGuard } from './service/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { DisplayClipartComponent } from './display-clipart/display-clipart.component';
import { FlexLayoutModule} from '@angular/flex-layout';


library.add(faStar);

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "login", canActivate: [AuthGuard] },
  { path: "home", component: ProductListComponent, canActivate: [AuthGuard]},
  { path: "product-list", component: ProductListComponent, canActivate: [AuthGuard]},
  { path: "add-product", component: AddProductComponent, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: "login", canActivate: [AuthGuard] } 
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpaces,
    StarRatingComponent,
    AddProductComponent,
    LoginComponent,
    SignupComponent,
    NotificationsComponent,
    NavbarComponent,
    DisplayClipartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
  ],

  providers: [AuthService, AngularFireAuth, AngularFireDatabase, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
