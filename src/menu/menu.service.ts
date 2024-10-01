import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Menu } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Créer un menu
  async createMenu(name: string, categoryIds: number[]): Promise<Menu> {
    return this.prisma.menu.create({
      data: {
        name,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });
  }

  // Obtenir tous les menus
  async getMenus(): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      include: { categories: true },
    });
  }

  // Mettre à jour un menu
  async updateMenu(id: number, name: string, categoryIds: number[]): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data: {
        name,
        categories: {
          set: categoryIds.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });
  }

  // Supprimer un menu
  async deleteMenu(id: number): Promise<Menu> {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
