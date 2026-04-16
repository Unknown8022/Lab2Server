import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { google } from 'googleapis';
import { Readable } from 'stream';

@Controller()
export class StorageController {
  private drive;

  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      '228034352509-rdaih0ckg1ln8u5716rpcrursd1kb6c1.apps.googleusercontent.com',
      'hiden',
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: 'hiden',
    });

    this.drive = google.drive({ version: 'v3', auth: oauth2Client });
  }

  @MessagePattern({ cmd: 'upload_file' }) // Слухаємо команду від Gateway
  async handleFileUpload(@Payload() data: { buffer: any; name: string }) {
    const response = await this.drive.files.create({
      requestBody: {
        name: data.name,
        parents: ['1e3HazomYSC0frVDXVtuyHAJXPVzImdYa'],
      },
      media: {
        mimeType: 'image/png',
        body: Readable.from(Buffer.from(data.buffer)),
      },
    });
    return { id: response.data.id, link: response.data.webViewLink };
  }
}
