import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prosthesis } from '@app/common';

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

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['user'], // Чтобы мы могли проверить владельца
    });
    if (!item) throw new NotFoundException(`Prosthesis #${id} not found`);
    return item;
  }

  async findAll() {
    return await this.repo.find({ relations: ['user', 'sensors', 'engine'] });
  }
}
