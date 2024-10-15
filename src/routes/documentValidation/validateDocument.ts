import { Request, Response } from "express";
import fs from "fs";
import AWS from 'aws-sdk';

// TYPES
interface MulterRequest extends Request {
    file: any;
}

AWS.config.update({ region: 'us-east-1' });
const rekognition = new AWS.Rekognition();

export default async function ValidateDocument(req: MulterRequest, res: Response) {
    try {
        console.log(req.file);

        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const imageBytes = fs.readFileSync(req.file.path);

        const params = {
            Image: {
                Bytes: imageBytes,
            },
        };

        rekognition.detectText(params, (err, data) => {
            if (err) {
                console.error('Error detecting text', err);
                return res.status(500).send('Error detecting text');
            }

            const detectedText = data.TextDetections?.map((text) => text.DetectedText);
            return res.json({ detectedText });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
}
