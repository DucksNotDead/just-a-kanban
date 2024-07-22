import express from 'express';
import cors from 'cors';
import { db } from './db';
import { PORT } from './global/const';
import { AppRouter } from './router';
import { AuthController } from './controllers/AuthController';
import { TaskController } from './controllers/TaskController';
import { CategoryController } from './controllers/CategoryController';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import { StepController } from './controllers/StepController';

db.init().then(() => {
	const app = express();

	app.use(express.json());
	app.use(cors({ origin: 'http://localhost:3001' }));

	new AppRouter(
		AuthController,
		TaskController,
		CategoryController,
		StepController,
	)
		.protect(AuthMiddleware)
		.init(app);

	app.listen(PORT, () => console.log('STARTS ON ' + PORT));
});
