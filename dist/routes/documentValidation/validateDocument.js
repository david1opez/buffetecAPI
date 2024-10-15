"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValidateDocument;
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: 'us-east-1' });
const rekognition = new aws_sdk_1.default.Rekognition();
async function ValidateDocument(req, res) {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const imageBytes = fs_1.default.readFileSync(req.file.path);
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
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    finally {
        if (req.file) {
            fs_1.default.unlinkSync(req.file.path);
        }
    }
}
//# sourceMappingURL=validateDocument.js.map