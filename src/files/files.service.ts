import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { PublicFile } from './entities/public-file.entity';
import { Counter } from 'prom-client';
import {
  InjectMetric,
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';

@Injectable()
export class FilesService {
  private drive;

  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    @InjectMetric('google_drive_uploads_total')
    private readonly uploadCounter: Counter,
  ) {
    const auth = new google.auth.GoogleAuth({
      keyFile: './google-credentials.json', // Файл у корені проекту
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadFile(dataBuffer: Buffer, filename: string) {
    try {
      const fileMetadata = {
        name: filename,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // ID твоєї папки
      };

      const media = {
        mimeType: 'application/octet-stream',
        body: Readable.from(dataBuffer),
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
      });

      // Збільшуємо метрику успіху
      this.uploadCounter.inc({ status: 'success' });

      const newFile = this.publicFilesRepository.create({
        googleDriveId: response.data.id,
        url: response.data.webViewLink,
      });

      return await this.publicFilesRepository.save(newFile);
    } catch (error) {
      this.uploadCounter.inc({ status: 'failed' });
      throw error;
    }
  }
}
