import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1726059383189 implements MigrationInterface {
    name = 'Update1726059383189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`order\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`order\``);
    }

}
