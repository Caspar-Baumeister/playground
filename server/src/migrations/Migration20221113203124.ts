import { Migration } from '@mikro-orm/migrations';

export class Migration20221113203124 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('drop table if exists "post" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "post" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('drop table if exists "product" cascade;');
  }

}
