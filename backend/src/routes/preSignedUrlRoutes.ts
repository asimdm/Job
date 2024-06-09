import { Router } from "express";
import { generatePresignedUrl } from '../controllers/preSignedUrlController';

const router = Router();

router.post('/generate-presigned-url', generatePresignedUrl);

export default router;