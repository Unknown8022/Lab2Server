import { Module } from '@nestjs/common';
import { StorageServiceController } from './storage-service.controller';
import { StorageServiceService } from './storage-service.service';

@Module({
  imports: [],
  controllers: [StorageServiceController],
  providers: [StorageServiceService],
})
export class StorageServiceModule {}
