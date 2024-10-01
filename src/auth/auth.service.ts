import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { EmailService } from '../services/email.service'; // Importation de l'EmailService

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService  // Injection de l'EmailService
  ) {}

  // Méthode pour enregistrer un nouvel utilisateur
  async register(email: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create(email, hashedPassword, role);
    return newUser;
  }

  // Méthode pour valider l'utilisateur lors de la connexion
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _password, ...result } = user;
    return result;
  }

  // Génération du JWT lors de la connexion
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: [user.role] }; // Inclure le rôle dans le JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  // Générer un token de réinitialisation de mot de passe et envoyer un e-mail
  async createPasswordResetToken(email: string): Promise<string | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    await this.userService.saveResetToken(user.id, resetToken);

    // Envoyer un e-mail avec le lien de réinitialisation
    const token = `${resetToken}`;
    await this.emailService.sendPasswordResetEmail(email, token); // Utilisation de l'EmailService

    return resetToken;
  }

  // Réinitialiser le mot de passe
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const userId = await this.userService.getUserIdByResetToken(token);
    if (!userId) {
      throw new Error('Invalid or expired token');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updatePassword(userId, hashedPassword);
    await this.userService.clearResetToken(userId);
  
    return true;
  }
}
