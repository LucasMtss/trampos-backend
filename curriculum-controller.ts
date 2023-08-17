import express, { Request, Response } from 'express';
import { Curriculum } from '../models/curriculum-model';
import crypto from 'crypto'
import { authenticateToken } from '../middlewares/auth-middleware';

const router = express.Router();

// Read curriculum by Slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      const curriculum = await Curriculum.findOne({ where: { slug } });
      if (!curriculum) {
        res.status(404).json({ message: 'Curriculum not found' });
      } else {
        res.json(curriculum);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

router.use(authenticateToken);

// Create Curriculum
router.post('/', async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const randomSlug = crypto.randomBytes(8).toString('hex');
    const newCurriculum = await Curriculum.create({data, slug: randomSlug});
    res.status(201).json(newCurriculum);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update curriculum
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Curriculum.update(req.body, { where: { id } });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'Curriculum not found' });
    } else {
      res.json({ message: 'Curriculum updated successfully' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Read curriculum by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const curriculum = await Curriculum.findByPk(id);
    if (!curriculum) {
      res.status(404).json({ message: 'Curriculum not found' });
    } else {
      res.json(curriculum);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});



// Read curriculums
router.get('/', async (req: Request, res: Response) => {
  try {
    const curriculums = await Curriculum.findAll();
    res.json(curriculums);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete curriculum
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRows = await Curriculum.destroy({ where: { id } });
    if (deletedRows === 0) {
      res.status(404).json({ message: 'Curriculum not found' });
    } else {
      res.json({ message: 'Curriculum deleted successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as CurriculumController };
