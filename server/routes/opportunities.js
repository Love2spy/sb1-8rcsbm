import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const OpportunitySchema = z.object({
  title: z.string(),
  department: z.string(),
  status: z.string(),
  dueDate: z.string(),
  value: z.string(),
  contractType: z.string(),
  description: z.string(),
  naicsCode: z.string(),
  attachments: z.array(z.string()),
});

router.get('/', async (req, res) => {
  try {
    const opportunities = await req.prisma.opportunity.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = OpportunitySchema.parse(req.body);
    const opportunity = await req.prisma.opportunity.create({
      data: {
        ...data,
        dueDate: new Date(data.dueDate),
      },
    });
    res.json(opportunity);
  } catch (error) {
    res.status(400).json({ error: 'Invalid opportunity data' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const opportunity = await req.prisma.opportunity.findUnique({
      where: { id: req.params.id },
    });
    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch opportunity' });
  }
});

export { router };