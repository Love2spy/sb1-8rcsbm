import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const AwardSchema = z.object({
  opportunityId: z.string(),
  status: z.string(),
  submissionDate: z.string(),
  value: z.string(),
});

router.get('/', async (req, res) => {
  try {
    const awards = await req.prisma.award.findMany({
      include: { opportunity: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch awards' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = AwardSchema.parse(req.body);
    const award = await req.prisma.award.create({
      data: {
        ...data,
        submissionDate: new Date(data.submissionDate),
      },
    });
    res.json(award);
  } catch (error) {
    res.status(400).json({ error: 'Invalid award data' });
  }
});

export { router };