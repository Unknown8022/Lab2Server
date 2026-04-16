import { HttpException, HttpStatus } from '@nestjs/common';

export class EngineNotFoundException extends HttpException {
  constructor() {
    super('Engine not found is system', HttpStatus.NOT_FOUND);
  }
}
