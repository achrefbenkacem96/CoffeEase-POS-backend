import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from './prisma.service';  // Importer PrismaService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurer CORS pour autoriser les requêtes provenant de ton frontend
  app.enableCors({
    origin: 'http://localhost:3000', // URL de ton frontend
    credentials: true,               // Si tu utilises des cookies ou des tokens avec credentials
  });

  // Obtenir PrismaService pour pouvoir le fermer correctement
  const prismaService = app.get(PrismaService);
  
  // Ajouter un hook pour gérer la fermeture propre de Prisma lors de l'arrêt de l'application
  prismaService.enableShutdownHooks(app);

  await app.listen(3001);

  // Capture manuelle des signaux système SIGINT et SIGTERM
  process.on('SIGINT', async () => {
    console.log('Received SIGINT, closing app...');
    await prismaService.$disconnect();
    await app.close();
  });

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, closing app...');
    await prismaService.$disconnect();
    await app.close();
  });
}

bootstrap();
