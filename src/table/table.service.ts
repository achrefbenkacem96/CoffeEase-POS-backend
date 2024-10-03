import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Table } from '@prisma/client';
import { TableDTO } from './table.dto';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  // table.service.ts
async createTable(number: number, status: string): Promise<TableDTO> {
  return this.prisma.table.create({
    data: {
      number,
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

  // Obtenir toutes les tables
  async getTables(): Promise<Table[]> {
    return this.prisma.table.findMany({
      include: { orders: true }, // Inclure les commandes liées à la table
    });
  }

  // Obtenir une table par son ID
  async getTableById(id: number): Promise<Table> {
    return this.prisma.table.findUnique({
      where: { id },
      include: { orders: true }, // Inclure les commandes
    });
  }
}
