import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankInfoComponent } from './components/bank-info/bank-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [AppComponent, BankInfoComponent, UserInfoComponent, MainComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
