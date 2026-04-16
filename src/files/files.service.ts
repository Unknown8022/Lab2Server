import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  private drive;

  constructor() {
    // Налаштовуємо клієнт OAuth2 замість сервісного акаунта
    const oauth2Client = new google.auth.OAuth2(
      '228034352509-rdaih0ckg1ln8u5716rpcrursd1kb6c1.apps.googleusercontent.com', // Твій Client ID
      'hidden-for-push', // Твій Client Secret з консолі Google
      'https://developers.google.com/oauthplayground',
    );
    // Додаємо Refresh Token, щоб доступ не зникав через годину
    oauth2Client.setCredentials({
      refresh_token: 'hidden-for-push',
    });

    this.drive = google.drive({ version: 'v3', auth: oauth2Client });
  }

  async uploadFile(dataBuffer: Buffer, filename: string) {
    try {
      // ID папки на ТВОЄМУ диску, куди полетить файл
      const folderId = '1e3HazomYSC0frVDXVtuyHAJXPVzImdYa';

      const response = await this.drive.files.create({
        requestBody: {
          name: filename,
          parents: [folderId],
        },
        media: {
          mimeType: 'image/png', // Оскільки ти завантажуєш картинку
          body: Readable.from(dataBuffer),
        },
        fields: 'id, webViewLink',
      });

      console.log('✅ Файл успішно завантажено на твій диск!');
      return response.data;
    } catch (error) {
      console.error(
        '❌ Помилка Google Drive API:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
