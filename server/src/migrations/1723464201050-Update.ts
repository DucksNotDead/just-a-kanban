import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1723464201050 implements MigrationInterface {
    name = 'Update1723464201050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`reviewerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD UNIQUE INDEX \`IDX_a5f3f3a97784c5239a53c63c8d\` (\`reviewerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a5f3f3a97784c5239a53c63c8d\` ON \`task\` (\`reviewerId\`)`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_a5f3f3a97784c5239a53c63c8d1\` FOREIGN KEY (\`reviewerId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_a5f3f3a97784c5239a53c63c8d1\``);
        await queryRunner.query(`DROP INDEX \`REL_a5f3f3a97784c5239a53c63c8d\` ON \`task\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP INDEX \`IDX_a5f3f3a97784c5239a53c63c8d\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`reviewerId\``);
    }

}
