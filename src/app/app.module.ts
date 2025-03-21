import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthModule } from './auth/auth.module';
import { ListRepairsComponent } from './client/list-repairs/list-repairs.component';
import { AppointmentComponent } from './client/appointment/appointment.component';
import { ClientModule } from './client/client.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    ClientModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListRepairsComponent,
    AppointmentComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
