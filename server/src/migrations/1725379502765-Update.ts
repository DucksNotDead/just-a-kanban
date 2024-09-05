import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1725379502765 implements MigrationInterface {
    name = 'Update1725379502765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3eab5fd901a98f82f44b7560fa4\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3eab5fd901a98f82f44b7560fa4\` FOREIGN KEY (\`sliceId\`) REFERENCES \`slice\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3eab5fd901a98f82f44b7560fa4\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3eab5fd901a98f82f44b7560fa4\` FOREIGN KEY (\`sliceId\`) REFERENCES \`slice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
