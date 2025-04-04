import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  showPassword: boolean = false;
  alertMessage: string = '';  
  alertType: string = 'error'; 

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Sign-in details:', this.signInForm.value);
      this.authService.SignClientIn(this.signInForm.value).subscribe(
        (response) => {
          console.log('Sign-in response:', response);
          this.authService.SetClientToken(response.clientId);
          this.router.navigate(['/dashboard']);
        },
        (error ) => {
          if (error.error.message === "Invalid email") this.alertMessage = "Le client n'existe pas. Veuillez vérifier votre adresse mail ou veuillez vous inscrire.";
          if (error.error.message === "Invalid password") this.alertMessage = "Mot de passe incorrect.";
          if (error.error.message === "Server error") this.alertMessage = "Une erreur s'est produite. Veuillez contacter l'administrateur.";
        }
      );
    }
  }
}
