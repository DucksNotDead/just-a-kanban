import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724517283079 implements MigrationInterface {
    name = 'Update1724517283079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` int NOT NULL`);
    }

}
