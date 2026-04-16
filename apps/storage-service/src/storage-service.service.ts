import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
