import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Ajouter un produit
 // Ajouter un produit
async addProduct(data: {
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId: number,
  imageUrl?: string,
}): Promise<ProductDTO> {
  const product = await this.prisma.product.create({
    data,
    include: { category: true }, // Inclure la catégorie si nécessaire
  });

  // Vérifiez que l'ID est bien récupéré
  if (!product.id) {
    throw new Error("Product creation failed, no ID returned.");
  }

  // Retourner le produit créé avec toutes les données
  return {
    id: product.id,  // S'assurer que l'ID est renvoyé
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    stockAlert: product.stockAlert,
    createdAt: product.createdAt,
    imageUrl: product.imageUrl, // Ajouter l'URL de l'image si présente
    category: {
      id: product.category.id,
      name: product.category.name,
      imageUrl: product.category.imageUrl,
      createdAt: product.category.createdAt,
    },
  };
}

  
  

  /// Mettre à jour un produit
  async updateProduct(productId: number, data: {
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    imageUrl?: string,  // Inclure imageUrl pour la mise à jour
    categoryId?: number,
  }): Promise<ProductDTO> {
    // Exécuter la mise à jour dans la base de données
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data,
      include: { category: true },
    });

    // Retourner les détails du produit mis à jour
    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
      stockAlert: updatedProduct.stockAlert,
      createdAt: updatedProduct.createdAt,
      imageUrl: updatedProduct.imageUrl,
      category: {
        id: updatedProduct.category.id,
        name: updatedProduct.category.name,
        imageUrl: updatedProduct.category.imageUrl,
        createdAt: updatedProduct.category.createdAt,
      },
    };
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
 async getProductsByCategory(categoryId: number): Promise<ProductDTO[]> {
  return this.prisma.product.findMany({
    where: {
      categoryId: categoryId, // Filtrer par catégorie
    },
    include: { category: true }, // Inclure la catégorie dans la réponse
  });
}


}
