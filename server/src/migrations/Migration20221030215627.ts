import { Migration } from '@mikro-orm/migrations';

export class Migration20221030215627 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "admin" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" text not null, "password" text not null);');
    this.addSql('alter table "admin" add constraint "admin_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "admin" cascade;');
  }

}
