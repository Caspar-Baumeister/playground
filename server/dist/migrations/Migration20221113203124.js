"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20221113203124 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20221113203124 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "product" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
        this.addSql('drop table if exists "post" cascade;');
    }
    async down() {
        this.addSql('create table "post" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
        this.addSql('drop table if exists "product" cascade;');
    }
}
exports.Migration20221113203124 = Migration20221113203124;
//# sourceMappingURL=Migration20221113203124.js.map