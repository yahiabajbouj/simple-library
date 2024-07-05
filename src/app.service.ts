import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './books/modules/book.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async findHotBooks(): Promise<Book[]> {
    const cacheKey = 'hotBooks';
    let hotBooks = await this.cacheManager.get<Book[]>(cacheKey);
  
    if (!hotBooks) {
      hotBooks = await this.booksRepository.find({ where: { is_hot: true } });
      await this.cacheManager.set(cacheKey, hotBooks, 300);
    }

    return hotBooks;
  }
}
