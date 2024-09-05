import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1725379096143 implements MigrationInterface {
    name = 'Update1725379096143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_d88edac9d7990145ff6831a7bb3\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3eab5fd901a98f82f44b7560fa4\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sliceId\` \`sliceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_d958e9af935f058823a58b09cb9\``);
        await queryRunner.query(`ALTER TABLE \`board\` CHANGE \`createdById\` \`createdById\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3eab5fd901a98f82f44b7560fa4\` FOREIGN KEY (\`sliceId\`) REFERENCES \`slice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_d88edac9d7990145ff6831a7bb3\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_d958e9af935f058823a58b09cb9\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_d958e9af935f058823a58b09cb9\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_d88edac9d7990145ff6831a7bb3\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3eab5fd901a98f82f44b7560fa4\``);
        await queryRunner.query(`ALTER TABLE \`board\` CHANGE \`createdById\` \`createdById\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_d958e9af935f058823a58b09cb9\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sliceId\` \`sliceId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3eab5fd901a98f82f44b7560fa4\` FOREIGN KEY (\`sliceId\`) REFERENCES \`slice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_d88edac9d7990145ff6831a7bb3\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
