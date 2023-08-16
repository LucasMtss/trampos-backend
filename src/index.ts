import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { UserController } from './controllers/user-controller';
import { CurriculumController } from './controllers/curriculum-controller';
import { AuthController } from './controllers/auth.controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

app.use('/users', UserController);
app.use('/curriculum', CurriculumController);
app.use('/auth', AuthController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
