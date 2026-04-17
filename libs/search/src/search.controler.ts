import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('index')
  async indexData(@Body() body: any) {
    return await this.searchService.indexDocument('prothesis_data', body);
  }

  @Get('find')
  async findData(@Query('text') text: string) {
    return await this.searchService.find('prothesis_data', text);
  }
}
