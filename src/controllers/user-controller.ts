import express, { Request, Response } from 'express';
import { User } from '../models/user-model';
import { Op } from 'sequelize';
import { authenticateToken } from '../middlewares/auth-middleware';

const router = express.Router();

router.use(authenticateToken);

// Create user
router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await User.update(req.body, { where: { id } });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Read user by filters
router.get('/search', async (req: Request, res: Response) => {
  const { nome, idade, profissao, habilidades, nivelSenioridade, estado, cidade } = req.query;


  const whereClause: any = {};

  if (nome) {
    const nomes = Array.isArray(nome) ? nome.map(name => name.toString()) : [nome].map(name => name.toString())
    whereClause.nome = {
      [Op.or]: nomes.map(item => item.split(',')).flat(1).map((item: string) => ({ [Op.like]: `%${item}%` }))
    };
  }

  if (idade) {
    whereClause.idade = idade;
  }

  if (profissao) {
    const profissoes = Array.isArray(profissao) ? profissao.map(item => item.toString()) : [profissao].map(item => item.toString())
    whereClause.profissao = {
      [Op.or]: profissoes.map(item => item.split(',')).flat(1).map((item: string) => ({ [Op.like]: `%${item}%` }))
    };
  }

  if (habilidades) {
    const skills = Array.isArray(habilidades) ? habilidades.map(item => item.toString()) : [habilidades].map(item => item.toString())
    whereClause.habilidades = {
      [Op.or]: skills.map(item => item.split(',')).flat(1).map((item: string) => ({ [Op.like]: `%${item}%` }))
    };
  }

  if (nivelSenioridade) {
    const niveis = Array.isArray(nivelSenioridade) ? nivelSenioridade.map(item => item.toString()) : [nivelSenioridade].map(item => item.toString())
    whereClause.nivelSenioridade = {
      [Op.or]: niveis.map(item => item.split(',')).flat(1).map((item: string) => ({ [Op.like]: `%${item}%` }))
    };
  }

  if (estado) {
    const estados = Array.isArray(estado) ? estado.map(item => item.toString()) : [estado].map(item => item.toString())
    whereClause.estado = {
      [Op.or]: estados.map(item => item.split(',')).flat(1).map((item: string) => ({ [Op.like]: `%${item}%` }))
    };
  }

  if (cidade) {
    const cidades = Array.isArray(cidade) ? cidade.map(item => item.toString()) : [cidade].map(item => item.toString())
    whereClause.cidade = {
      [Op.or]: cidades.map(item => item.split(',')).flat(1).map((item: string) => ({ [Op.like]: `%${item}%` }))
    };
  }

  try {
    const users = await User.findAll({
      where: whereClause,
    });

    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


// Read user by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Read users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRows = await User.destroy({ where: { id } });
    if (deletedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as UserController };
