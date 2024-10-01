import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  findById(sub: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  // Mettre à jour le rôle d'un utilisateur
  async updateUserRole(id: number, role: string): Promise<boolean> {
    await this.prisma.user.update({
      where: { id },
      data: { role },
    });
    return true;
  }

  // Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // Méthode pour trouver un utilisateur par email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Méthode pour créer un nouvel utilisateur
  async create(email: string, password: string, role: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
  }

  // Méthode pour sauvegarder le token de réinitialisation de mot de passe
  async saveResetToken(userId: number, resetToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { resetToken },
    });
  }

  // Méthode pour récupérer l'utilisateur via le token de réinitialisation
  async getUserIdByResetToken(resetToken: string): Promise<number | null> {
    const user = await this.prisma.user.findFirst({
      where: { resetToken },
      select: { id: true },
    });
    return user?.id ?? null;
  }

  // Mettre à jour le mot de passe après réinitialisation
  async updatePassword(userId: number, newPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
  }

  // Effacer le token de réinitialisation après la réinitialisation du mot de passe
  async clearResetToken(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { resetToken: null },
    });
  }
}
