import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const generatePresignedUrl = (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `${uuidv4()}_${fileName}`,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, url) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error generating pre-signed URL' });
    }
    res.json({ url });
  });
};
