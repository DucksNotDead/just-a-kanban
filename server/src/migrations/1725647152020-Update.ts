import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1725647152020 implements MigrationInterface {
    name = 'Update1725647152020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_93e13dca2901275bb95c0c1765\` ON \`task\``);
        await queryRunner.query(`ALTER TABLE \`board\` CHANGE \`undoneTasksCount\` \`tasksCount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`todosCount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`doneTodosCount\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`doneTodosCount\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`todosCount\``);
        await queryRunner.query(`ALTER TABLE \`board\` CHANGE \`tasksCount\` \`undoneTasksCount\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_93e13dca2901275bb95c0c1765\` ON \`task\` (\`replacerId\`)`);
    }

}
