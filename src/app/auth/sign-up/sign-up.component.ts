import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  alertMessage: string = '';  
  alertType: string = 'error'; 

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.SignClientUp(this.signUpForm.value).subscribe(
        (response) => {
          console.log('Sign-up response:', response);
          this.router.navigate(['/signin']);
        },
        (error) => {
          if (error.error.message === "Client already exists") this.alertMessage = "Le client existe déjà.Veuillez utiliser une autre adresse mail.";
          if (error.error.message === "Server error") this.alertMessage = "Une erreur s'est produite. Veuillez contacter l'administrateur.";
        }
      );
    }
  }
}
