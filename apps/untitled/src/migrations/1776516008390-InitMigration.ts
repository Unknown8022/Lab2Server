import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1776516008390 implements MigrationInterface {
    name = 'InitMigration1776516008390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "battery" ("id" SERIAL NOT NULL, "percentage" integer NOT NULL, "voltage" integer NOT NULL, "isCharging" boolean NOT NULL, "temperature" integer NOT NULL, CONSTRAINT "PK_48100ff77c357004dfd6a51efdf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensor" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "value" double precision NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prosthesis" ("id" SERIAL NOT NULL, "modelName" character varying NOT NULL, "batteryLevel" double precision NOT NULL DEFAULT '100', "userId" integer, "engineId" integer, CONSTRAINT "REL_649c5ef6382a6f6510fb9e61aa" UNIQUE ("engineId"), CONSTRAINT "PK_1a8dfedc5ed2489103db9adab3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "engine" ("id" SERIAL NOT NULL, "power" integer NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_a53ad5b7b5302ec9de3e1f384aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prosthesis_sensors_sensor" ("prosthesisId" integer NOT NULL, "sensorId" integer NOT NULL, CONSTRAINT "PK_5545689a6cfc0ff4ff4ef96b137" PRIMARY KEY ("prosthesisId", "sensorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_469baa5ade998cdfe698b1ac0b" ON "prosthesis_sensors_sensor" ("prosthesisId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7b88f2263ed2f2383ad1387aa4" ON "prosthesis_sensors_sensor" ("sensorId") `);
        await queryRunner.query(`ALTER TABLE "prosthesis" ADD CONSTRAINT "FK_47eaf3018a10d0a7b79cdba91ce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prosthesis" ADD CONSTRAINT "FK_649c5ef6382a6f6510fb9e61aa5" FOREIGN KEY ("engineId") REFERENCES "engine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prosthesis_sensors_sensor" ADD CONSTRAINT "FK_469baa5ade998cdfe698b1ac0b4" FOREIGN KEY ("prosthesisId") REFERENCES "prosthesis"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "prosthesis_sensors_sensor" ADD CONSTRAINT "FK_7b88f2263ed2f2383ad1387aa4e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prosthesis_sensors_sensor" DROP CONSTRAINT "FK_7b88f2263ed2f2383ad1387aa4e"`);
        await queryRunner.query(`ALTER TABLE "prosthesis_sensors_sensor" DROP CONSTRAINT "FK_469baa5ade998cdfe698b1ac0b4"`);
        await queryRunner.query(`ALTER TABLE "prosthesis" DROP CONSTRAINT "FK_649c5ef6382a6f6510fb9e61aa5"`);
        await queryRunner.query(`ALTER TABLE "prosthesis" DROP CONSTRAINT "FK_47eaf3018a10d0a7b79cdba91ce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b88f2263ed2f2383ad1387aa4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_469baa5ade998cdfe698b1ac0b"`);
        await queryRunner.query(`DROP TABLE "prosthesis_sensors_sensor"`);
        await queryRunner.query(`DROP TABLE "engine"`);
        await queryRunner.query(`DROP TABLE "prosthesis"`);
        await queryRunner.query(`DROP TABLE "sensor"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "battery"`);
    }

}
