import { Router } from "express";
import { createJob, deleteJob, updateJob, getJob, getJobs } from '../controllers/jobController';
import { authenticationToken } from '../middlewares/authentication';

const router = Router();

router.post('/jobs', authenticationToken, createJob);
router.get('/jobs', authenticationToken, getJobs);
router.get('/job/:id', authenticationToken, getJob);
router.put('/job/:id', authenticationToken, updateJob);
router.delete('/job/:id', authenticationToken, deleteJob);

export default router;