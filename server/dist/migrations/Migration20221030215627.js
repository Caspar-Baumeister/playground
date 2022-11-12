"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20221030215627 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20221030215627 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "admin" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" text not null, "password" text not null);');
        this.addSql('alter table "admin" add constraint "admin_email_unique" unique ("email");');
    }
    async down() {
        this.addSql('drop table if exists "admin" cascade;');
    }
}
exports.Migration20221030215627 = Migration20221030215627;
//# sourceMappingURL=Migration20221030215627.js.map