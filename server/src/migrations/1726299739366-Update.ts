import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1726299739366 implements MigrationInterface {
    name = 'Update1726299739366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`step\` ADD \`label\` varchar(60) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`step\` DROP COLUMN \`label\``);
    }

}
