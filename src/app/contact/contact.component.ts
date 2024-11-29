import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [
    RouterLink
  ],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: '',
  };

  feedbackMessage: string = '';
  isSuccess: boolean = true;

  async onSubmit() {
    const formUrl = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree URL

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify(this.formData),
      });

      if (response.ok) {
        this.feedbackMessage = 'Your message has been sent successfully!';
        this.isSuccess = true;
        this.formData = {name: '', email: '', message: ''}; // Reset form
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      this.feedbackMessage = 'There was an error sending your message. Please try again later.';
      this.isSuccess = false;
    }
  }
}
