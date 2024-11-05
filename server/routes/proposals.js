import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';

const router = Router();
const upload = multer({ dest: 'uploads/' });

const ProposalSchema = z.object({
  opportunityId: z.string(),
  status: z.string(),
  executiveSummary: z.string(),
  technicalApproach: z.string(),
  pastPerformance: z.array(z.string()),
  dueDate: z.string(),
  questionsDeadline: z.string(),
});

router.post('/', upload.array('documents'), async (req, res) => {
  try {
    const data = ProposalSchema.parse(JSON.parse(req.body.data));
    const documents = req.files.map(file => file.path);

    const proposal = await req.prisma.proposal.create({
      data: {
        ...data,
        documents,
        dueDate: new Date(data.dueDate),
        questionsDeadline: new Date(data.questionsDeadline),
      },
    });
    res.json(proposal);
  } catch (error) {
    res.status(400).json({ error: 'Invalid proposal data' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const proposal = await req.prisma.proposal.findUnique({
      where: { id: req.params.id },
      include: { opportunity: true },
    });
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proposal' });
  }
});

export { router };