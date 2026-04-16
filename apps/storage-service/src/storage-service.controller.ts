import { Controller, Get } from '@nestjs/common';
import { StorageServiceService } from './storage-service.service';

@Controller()
export class StorageServiceController {
  constructor(private readonly storageServiceService: StorageServiceService) {}

  @Get()
  getHello(): string {
    return this.storageServiceService.getHello();
  }
}
