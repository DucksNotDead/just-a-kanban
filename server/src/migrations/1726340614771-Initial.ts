import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1726340614771 implements MigrationInterface {
    name = 'Initial1726340614771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(120) NOT NULL, \`date\` varchar(10) NOT NULL, \`time\` varchar(9) NOT NULL, \`isService\` tinyint NOT NULL DEFAULT 0, \`taskId\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`step\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(60) NOT NULL, \`label\` varchar(60) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(60) NOT NULL, \`order\` int NULL, \`checked\` tinyint NOT NULL DEFAULT 0, \`taskId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(60) NOT NULL, \`order\` int NOT NULL, \`created\` varchar(18) NOT NULL, \`updated\` varchar(18) NOT NULL, \`starts\` varchar(18) NULL, \`deadline\` varchar(18) NOT NULL, \`todosCount\` int NULL, \`doneTodosCount\` int NULL, \`unreadCommentsCount\` int NULL, \`lastComment\` int NULL, \`responsibleId\` int NULL, \`reviewerId\` int NULL, \`sliceId\` int NULL, \`stepId\` int NOT NULL, \`boardId\` int NULL, UNIQUE INDEX \`IDX_3399e2710196ea4bf734751558\` (\`title\`), UNIQUE INDEX \`REL_a5f3f3a97784c5239a53c63c8d\` (\`reviewerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`slice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(60) NOT NULL, \`color\` varchar(21) NOT NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(60) NOT NULL, \`name\` varchar(60) NOT NULL, \`tasksCount\` int NULL, \`doneTasksCount\` int NULL, \`createdById\` int NULL, UNIQUE INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(60) NOT NULL, \`name\` varchar(60) NOT NULL, \`password\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL, \`avatar\` int NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment_read_by_user\` (\`commentId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_b944cf678e9ec57e7d25af0650\` (\`commentId\`), INDEX \`IDX_26d54dd26ce60c2f2f17290b8d\` (\`userId\`), PRIMARY KEY (\`commentId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_users_user\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_429493a491957e757423f7ddef\` (\`boardId\`), INDEX \`IDX_523009f956b8194970cd48dc7d\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_managers_user\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_b337cc6e25b8e2802c37eafb34\` (\`boardId\`), INDEX \`IDX_5a8cd8c69b014fe3580ff94f78\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_9fc19c95c33ef4d97d09b72ee95\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_681a7f7ce5bbf0990f8d51f4e0d\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_4ba68e3e65410dfd632913e4373\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_a5f3f3a97784c5239a53c63c8d1\` FOREIGN KEY (\`reviewerId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3eab5fd901a98f82f44b7560fa4\` FOREIGN KEY (\`sliceId\`) REFERENCES \`slice\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_c0b0e34ea231717db90095ab6a2\` FOREIGN KEY (\`stepId\`) REFERENCES \`step\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_d88edac9d7990145ff6831a7bb3\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD CONSTRAINT \`FK_56dda485945c83cc178bd556ed1\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_d958e9af935f058823a58b09cb9\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment_read_by_user\` ADD CONSTRAINT \`FK_b944cf678e9ec57e7d25af06502\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`comment_read_by_user\` ADD CONSTRAINT \`FK_26d54dd26ce60c2f2f17290b8d1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` ADD CONSTRAINT \`FK_429493a491957e757423f7ddef7\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` ADD CONSTRAINT \`FK_523009f956b8194970cd48dc7df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` ADD CONSTRAINT \`FK_b337cc6e25b8e2802c37eafb34e\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` ADD CONSTRAINT \`FK_5a8cd8c69b014fe3580ff94f785\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` DROP FOREIGN KEY \`FK_5a8cd8c69b014fe3580ff94f785\``);
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` DROP FOREIGN KEY \`FK_b337cc6e25b8e2802c37eafb34e\``);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` DROP FOREIGN KEY \`FK_523009f956b8194970cd48dc7df\``);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` DROP FOREIGN KEY \`FK_429493a491957e757423f7ddef7\``);
        await queryRunner.query(`ALTER TABLE \`comment_read_by_user\` DROP FOREIGN KEY \`FK_26d54dd26ce60c2f2f17290b8d1\``);
        await queryRunner.query(`ALTER TABLE \`comment_read_by_user\` DROP FOREIGN KEY \`FK_b944cf678e9ec57e7d25af06502\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_d958e9af935f058823a58b09cb9\``);
        await queryRunner.query(`ALTER TABLE \`slice\` DROP FOREIGN KEY \`FK_56dda485945c83cc178bd556ed1\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_d88edac9d7990145ff6831a7bb3\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_c0b0e34ea231717db90095ab6a2\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3eab5fd901a98f82f44b7560fa4\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_a5f3f3a97784c5239a53c63c8d1\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_4ba68e3e65410dfd632913e4373\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_681a7f7ce5bbf0990f8d51f4e0d\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_9fc19c95c33ef4d97d09b72ee95\``);
        await queryRunner.query(`DROP INDEX \`IDX_5a8cd8c69b014fe3580ff94f78\` ON \`board_managers_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b337cc6e25b8e2802c37eafb34\` ON \`board_managers_user\``);
        await queryRunner.query(`DROP TABLE \`board_managers_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_523009f956b8194970cd48dc7d\` ON \`board_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_429493a491957e757423f7ddef\` ON \`board_users_user\``);
        await queryRunner.query(`DROP TABLE \`board_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_26d54dd26ce60c2f2f17290b8d\` ON \`comment_read_by_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b944cf678e9ec57e7d25af0650\` ON \`comment_read_by_user\``);
        await queryRunner.query(`DROP TABLE \`comment_read_by_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` ON \`board\``);
        await queryRunner.query(`DROP TABLE \`board\``);
        await queryRunner.query(`DROP TABLE \`slice\``);
        await queryRunner.query(`DROP INDEX \`REL_a5f3f3a97784c5239a53c63c8d\` ON \`task\``);
        await queryRunner.query(`DROP INDEX \`IDX_3399e2710196ea4bf734751558\` ON \`task\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`todo\``);
        await queryRunner.query(`DROP TABLE \`step\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
