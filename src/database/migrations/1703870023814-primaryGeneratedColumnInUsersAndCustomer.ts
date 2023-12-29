import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimaryGeneratedColumnInUsersAndCustomer1703870023814 implements MigrationInterface {
    name = 'PrimaryGeneratedColumnInUsersAndCustomer1703870023814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('"user_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "customer_id_seq" OWNED BY "customer"."id"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "id" SET DEFAULT nextval('"customer_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "customer_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
    }

}
