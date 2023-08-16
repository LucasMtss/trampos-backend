import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Login } from '../models/login-model'; // Certifique-se de importar o modelo de usuário

const authRouter = express.Router();

// Rota de registro (signup)
authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Verifique se o nome de usuário já está em uso
    const existingUser = await Login.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crie um novo usuário
    const newUser = await Login.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Rota de login (signin)
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Encontre o usuário pelo nome de usuário
    const user = await Login.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verifique a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Crie um token JWT com um payload
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Authentication successful', token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { authRouter as AuthController};
