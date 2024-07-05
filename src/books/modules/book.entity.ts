import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Borrow } from './Borrow.entity';
import { User } from 'src/auth/modules/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isbn: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ default: false })
  is_hot: boolean;

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow[];

  @ManyToMany(() => User, user => user.books)
  // @JoinTable({ name: 'borrow', joinColumn: { name: 'bookId' }, inverseJoinColumn: { name: 'userId' } })
  users: User[];
}
