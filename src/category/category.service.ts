import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Créer une nouvelle catégorie
  async createCategory(name: string): Promise<Category> {
    return this.prisma.category.create({
      data: { name },
    });
  }

  // Obtenir toutes les catégories
  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  // Obtenir une catégorie par son ID
  async getCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  // Mettre à jour une catégorie
  async updateCategory(id: number, name: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  // Supprimer une catégorie
  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
