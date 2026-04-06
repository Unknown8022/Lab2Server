import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prosthesis } from './entities/prosthesis.entity';

@Injectable()
export class ProsthesisService {
  constructor(
    @InjectRepository(Prosthesis)
    private repo: Repository<Prosthesis>,
  ) {}

  async create(data: any) {
    const prosthesis = this.repo.create(data);
    return await this.repo.save(prosthesis);
  }

  async findAll() {
    return await this.repo.find({ relations: ['user', 'sensors', 'engine'] });
  }
}
