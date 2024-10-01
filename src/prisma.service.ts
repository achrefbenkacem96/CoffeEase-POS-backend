import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private _financialReport: any;
  public get financialReport(): any {
    return this._financialReport;
  }
  public set financialReport(value: any) {
    this._financialReport = value;
  }
    private _salesReport: any;
  public get salesReport(): any {
    return this._salesReport;
  }
  public set salesReport(value: any) {
    this._salesReport = value;
  }
    private _stockReport: any;
  public get stockReport(): any {
    return this._stockReport;
  }
  public set stockReport(value: any) {
    this._stockReport = value;
  }
  async onModuleInit() {
    await this.$connect();
  }

  // Gestion manuelle de la fermeture de Prisma avec les signaux système
  async enableShutdownHooks(app: INestApplication): Promise<void> {
    // Gestion du signal SIGINT (Ctrl + C)
    process.on('SIGINT', async () => {
      console.log('Received SIGINT. Closing Prisma and app...');
      await this.$disconnect();
      await app.close();
    });

    // Gestion du signal SIGTERM (fermeture via système)
    process.on('SIGTERM', async () => {
      console.log('Received SIGTERM. Closing Prisma and app...');
      await this.$disconnect();
      await app.close();
    });
  }
}
