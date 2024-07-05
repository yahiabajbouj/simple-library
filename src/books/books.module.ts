import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/books.service';
import { Borrow } from './modules/Borrow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './modules/book.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BorrowService } from './services/brorrow.service';
import { User } from 'src/auth/modules/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }),
    AuthModule, TypeOrmModule.forFeature([Book, Borrow, User])],
  controllers: [BooksController],
  providers: [BooksService, BorrowService]
})
export class BooksModule { }
