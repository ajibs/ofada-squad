import winston from 'winston';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

export default function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // enable cors
  app.use(cors());

  // Routes
  app.use(router);

  // 404
  app.use((req, res) => {
    res.status(404).send({
      status: 404,
      message: 'The requested resource was not found',
    });
  });

  // 5xx
  app.use((err, req, res) => {
    winston.error(err.stack);

    const message = process.env.NODE_ENV === 'production'
      ? 'Something went wrong, we\'re looking into it...'
      : err.stack;

    res.status(500).send({
      status: 500,
      message,
    });
  });
}
