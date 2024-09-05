import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724654394431 implements MigrationInterface {
    name = 'Update1724654394431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`doneTasksCount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`undoneTasksCount\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`undoneTasksCount\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`doneTasksCount\``);
    }

}
