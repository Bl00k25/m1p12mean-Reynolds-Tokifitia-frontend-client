import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/services/auth/auth.service';
import { AppointmentsService } from 'app/services/appointments/appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  alertMessage: string = '';
  alertType: string = 'error';
  unavailableDates: string[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.fetchUnavailableDates();
  }

  fetchUnavailableDates() {
    return new Date().setHours(0,0,0,0);
  }

  isDateDisabled = (): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const formattedDate = today.toISOString().split('T')[0];

    return true;
  };

  constructor(private fb: FormBuilder, private http: HttpClient , private authService: AuthService , private appointmentsService: AppointmentsService) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      description: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const clientId = this.authService.GetClientToken();
      if (!clientId) {
        this.alertMessage=('Aucun ID client trouvé');
        this.alertType = 'error';
        return;
      }

      const appointmentData = {
        date: this.appointmentForm.value.date.toISOString(),
        description: this.appointmentForm.value.description,
        client: clientId,
        image: this.selectedFile ? this.imagePreview : null
      }
      console.log(appointmentData);

      this.appointmentsService.createAppointment(appointmentData).subscribe(
        (response) => {
          if (response.message == "Rendez-vous créé avec succès") { 
            this.alertMessage = 'Rendez-vous créé avec succès';
            this.alertType = 'success';
          }
        },
        (error) => {
          console.error('Error creating appointment', error);
          this.alertMessage = "Une erreur s'est produite. Veuillez contacter l'administrateur.";
          this.alertType = 'error';
        }
      )
    }
  }

}
