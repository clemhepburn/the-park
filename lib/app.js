import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import messageController from './controllers/messages';

const app = express();

app.use(express.json());

app.use(express.static('fe'));

app.use(messageController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
