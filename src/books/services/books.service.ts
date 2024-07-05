// books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../modules/book.entity';
import { CreateBookDto } from '../Dto/CreateBookDto';
import { UpdateBookDto } from '../Dto/UpdateBookDto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) { }

    findAll(): Promise<Book[]> {
        return this.booksRepository.find();
    }

    findOne(id: string): Promise<Book> {
        return this.booksRepository.findOne({
            where: {
                id: +id,
            },
        });
    }

    create(book: CreateBookDto): Promise<Book> {
        return this.booksRepository.save(book);
    }

    update(id: string, book: UpdateBookDto) {
        return this.booksRepository.update(id, book);
    }

    async remove(id: string): Promise<void> {
        await this.booksRepository.delete(id);
    }
}
