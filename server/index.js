import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { router as opportunitiesRouter } from './routes/opportunities.js';
import { router as subcontractorsRouter } from './routes/subcontractors.js';
import { router as proposalsRouter } from './routes/proposals.js';
import { router as awardsRouter } from './routes/awards.js';
import { router as samRouter } from './routes/sam.js';

const app = express();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Make Prisma available to routes
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Routes
app.use('/api/opportunities', opportunitiesRouter);
app.use('/api/subcontractors', subcontractorsRouter);
app.use('/api/proposals', proposalsRouter);
app.use('/api/awards', awardsRouter);
app.use('/api/sam', samRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});