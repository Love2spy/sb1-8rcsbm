import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const SubcontractorSchema = z.object({
  name: z.string(),
  type: z.string(),
  email: z.string().email(),
  phone: z.string(),
  certifications: z.array(z.string()),
});

router.get('/', async (req, res) => {
  try {
    const subcontractors = await req.prisma.subcontractor.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(subcontractors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcontractors' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = SubcontractorSchema.parse(req.body);
    const subcontractor = await req.prisma.subcontractor.create({
      data,
    });
    res.json(subcontractor);
  } catch (error) {
    res.status(400).json({ error: 'Invalid subcontractor data' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = SubcontractorSchema.partial().parse(req.body);
    const subcontractor = await req.prisma.subcontractor.update({
      where: { id: req.params.id },
      data,
    });
    res.json(subcontractor);
  } catch (error) {
    res.status(400).json({ error: 'Invalid subcontractor data' });
  }
});

export { router };