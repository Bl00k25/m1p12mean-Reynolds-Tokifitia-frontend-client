import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { AlertComponent } from 'app/alert/alert.component';
import { AppointmentComponent } from 'app/client/appointment/appointment.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { IconsComponent } from '../../icons/icons.component';
import { LandingPageComponent } from 'app/client/landing-page/landing-page.component';
import { ListRepairsComponent } from 'app/client/list-repairs/list-repairs.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { SignInComponent } from 'app/auth/sign-in/sign-in.component';
import { SignUpComponent } from 'app/auth/sign-up/sign-up.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes)
  ],
  declarations: [
    AlertComponent,
    AppointmentComponent,
    DashboardComponent,
    IconsComponent,
    LandingPageComponent,
    ListRepairsComponent,
    MapsComponent,
    NotificationsComponent,
    SignInComponent,
    SignUpComponent,
    TableListComponent,
    TypographyComponent,
    UpgradeComponent,
    UserProfileComponent,
  ],
})

export class AdminLayoutModule {}
