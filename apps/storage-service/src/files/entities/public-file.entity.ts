import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public_files')
export class PublicFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string; // Посилання webViewLink

  @Column()
  public key: string; // ID файлу в системі Google
}
