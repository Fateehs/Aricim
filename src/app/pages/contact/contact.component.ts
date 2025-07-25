import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private snackbar: SnackbarService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.submitting = true;

    // Burada API'ye gönderme veya başka işlem yapılabilir.
    setTimeout(() => {
      this.snackbar.show('Mesajınız başarıyla gönderildi! Teşekkürler 🐝');
      this.contactForm.reset();
      this.submitting = false;
    }, 1500);
  }
}
