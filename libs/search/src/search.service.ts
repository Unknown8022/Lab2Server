import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexDocument(index: string, document: any) {
    return await this.elasticsearchService.index({
      index,
      document, // У новій версії використовується 'document' замість 'body'
    });
  }

  async find(index: string, text: string) {
    const result = await this.elasticsearchService.search({
      index,
      query: {
        // 'query' тепер іде на верхньому рівні, без 'body'
        multi_match: {
          query: text,
          fields: ['title', 'content'],
        },
      },
    });

    // У новій версії результати лежать прямо в hits.hits
    return result.hits.hits;
  }
}
