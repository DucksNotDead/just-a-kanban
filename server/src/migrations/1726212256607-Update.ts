import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1726212256607 implements MigrationInterface {
    name = 'Update1726212256607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_93e13dca2901275bb95c0c1765e\``);
        await queryRunner.query(`DROP INDEX \`REL_93e13dca2901275bb95c0c1765\` ON \`task\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`replacerId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`replacerId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_93e13dca2901275bb95c0c1765\` ON \`task\` (\`replacerId\`)`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_93e13dca2901275bb95c0c1765e\` FOREIGN KEY (\`replacerId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
