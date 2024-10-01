import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Utilisez Gmail, ou remplacez par un autre service si nécessaire
      auth: {
        user: process.env.EMAIL_USER, // Votre adresse e-mail
        pass: process.env.EMAIL_PASS, // Votre mot de passe ou application password
      },
    });
  }

  async sendPasswordResetEmail(to: string, resetToken: string) {
    const resetUrl = `http://localhost:3000/new_password?token=${resetToken}`; // Assurez-vous que le lien de votre frontend est correct

    const mailOptions = {
      from: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
      to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset</p>
             <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>`,  // Ajout du lien avec le jeton
    };

    return this.transporter.sendMail(mailOptions);
  }
}
