import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller('search')
export class SearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Post('index')
  async indexData(@Body() data: any) {
    return await this.elasticsearchService.index({
      index: 'prosthesis_data',
      // У версії 8+ дані передаються безпосередньо в об'єкті або в document
      document: data,
    });
  }

  @Get()
  async search(@Query('text') text: string) {
    // Прибираємо деструктуризацію { body }
    const result = await this.elasticsearchService.search<any>({
      index: 'prosthesis_data',
      query: {
        // Поле query має бути на верхньому рівні, без body
        multi_match: {
          query: text,
          fields: ['title', 'content'],
        },
      },
    });

    // Результати тепер лежать прямо в result.hits.hits
    return result.hits.hits.map((hit) => hit._source);
  }
}
