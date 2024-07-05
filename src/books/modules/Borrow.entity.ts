import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from './book.entity';
import { User } from 'src/auth/modules/user.entity';

@Entity('borrow')
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrowDate: Date;

  @Column()
  returnDate: Date;

  @ManyToOne(() => Book, book => book.borrows)
  book: Book;

  @ManyToOne(() => User, user => user.borrows)
  user: User;
}
