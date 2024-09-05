import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1725379245034 implements MigrationInterface {
    name = 'Update1725379245034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`slice\` DROP FOREIGN KEY \`FK_56dda485945c83cc178bd556ed1\``);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD CONSTRAINT \`FK_56dda485945c83cc178bd556ed1\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`slice\` DROP FOREIGN KEY \`FK_56dda485945c83cc178bd556ed1\``);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD CONSTRAINT \`FK_56dda485945c83cc178bd556ed1\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
