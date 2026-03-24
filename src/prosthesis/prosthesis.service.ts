import { Injectable } from '@nestjs/common';
import { CreateProsthesisDto } from './dto/create-prosthesis.dto';
import { UpdateProsthesisDto } from './dto/update-prosthesis.dto';

@Injectable()
export class ProsthesisService {
  create(createProsthesisDto: CreateProsthesisDto) {
    return 'This action adds a new prosthesis';
  }

  findAll() {
    return `This action returns all prosthesis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prosthesis`;
  }

  update(id: number, updateProsthesisDto: UpdateProsthesisDto) {
    return `This action updates a #${id} prosthesis`;
  }

  remove(id: number) {
    return `This action removes a #${id} prosthesis`;
  }
}
