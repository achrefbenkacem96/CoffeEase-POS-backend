import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Ajouter un produit
  async addProduct(
    name: string,
    description: string,
    price: number,
    stock: number,
    categoryId: number,
  ): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        category: {
          connect: { id: categoryId }, // Associer un produit à une catégorie
        },
      },
    });
  }
  

  /// Mettre à jour un produit
async updateProduct(
  id: number,
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId?: number,
): Promise<Product> {
  const data: any = {
    name,
    description,
    price,
    stock,
  };

  // Si categoryId est fourni, mettre à jour la catégorie
  if (categoryId) {
    data.category = { connect: { id: categoryId } };
  }

  return this.prisma.product.update({
    where: { id },
    data,
  });
}

  
  // Supprimer un produit
  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // Obtenir tous les produits avec leur catégorie
async getProducts(): Promise<Product[]> {
  return this.prisma.product.findMany({
    include: { category: true }, // Inclure la catégorie dans la requête
  });
}


 // Obtenir un produit par son ID avec sa catégorie
async getProductById(id: number): Promise<Product> {
  return this.prisma.product.findUnique({
    where: { id },
    include: { category: true }, // Inclure la catégorie
  });
}

}
