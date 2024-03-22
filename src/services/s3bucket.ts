// src/services/s3bucket.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export const uploadVisitaImageToS3 = async (file: Express.Multer.File): Promise<any> => {
  const fileStream = fs.createReadStream(file.path);
  const bucketName = process.env.AWS_S3_BUCKET_NAME || 'default-bucket';

  const uploadParams = {
    Bucket: bucketName,
    Key: `visitas-images/${Date.now()}_${path.basename(file.originalname)}`,
    Body: fileStream,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

// Función para generar una URL firmada para subidas PUT
export const generatePresignedUrl = async (fileName: string): Promise<string> => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || 'default-bucket';
  const key = `visitas-images/${Date.now()}_${fileName}`; // Refactorización sugerida para claridad

  try {
    const command = new PutObjectCommand({ Bucket: bucketName, Key: key });
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    console.log("URL firmada generada:", signedUrl);
    return signedUrl;
  } catch (err) {
    console.log("Error al generar la URL firmada:", err);
    throw err;
  }
};
