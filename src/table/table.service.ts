import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Table } from '@prisma/client';
import { TableDTO } from './table.dto';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  // Créer une table avec le prochain numéro disponible
  async createTable(number: number, status: string): Promise<TableDTO> {
    // Trouver le plus grand numéro de table existant
    const lastTable = await this.prisma.table.findFirst({
      orderBy: {
        number: 'desc',
      },
    });

    // Si une table existe, ajouter 1 au plus grand numéro trouvé, sinon commencer à 1
    const nextTableNumber = lastTable ? lastTable.number + 1 : 1;

    // Créer la nouvelle table avec le prochain numéro disponible
    return this.prisma.table.create({
      data: {
        number: nextTableNumber,
        status,
      },
    });
  }

  // Mettre à jour le statut d'une table
  async updateTableStatus(id: number, status: string): Promise<TableDTO> {
    return this.prisma.table.update({
      where: { id },
      data: { status },
    });
  }

  // Supprimer une table
  async deleteTable(id: number): Promise<Table> {
    return this.prisma.table.delete({
      where: { id },
    });
  }

  // Obtenir toutes les tables avec les détails des commandes et des produits
  async getTables(): Promise<Table[]> {
    return this.prisma.table.findMany({
      include: { 
        orders: {
          include: {
            product: true, // Inclure le produit dans les commandes
          },
        },
      },
    });
  }

  // Obtenir une table par son ID avec les détails des commandes et des produits
  async getTableById(id: number): Promise<Table> {
    return this.prisma.table.findUnique({
      where: { id },
      include: { 
        orders: {
          include: {
            product: true,  // Inclure les détails des produits dans les commandes
          },
        },
      },
    });
  }
}
