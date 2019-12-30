import { Injectable, Req, NotFoundException, Res } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
@Injectable()
export class UploadService {
  s3: S3 = new S3({
    endpoint: process.env.SPACES_ENDPOINT,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
    region: process.env.SPACES_REGION,
  });

  async uploadFile(@Req() request, @Res() response) {
    await this.upload(request, response, error => {
      if (error) {
        console.log(error);
        throw new NotFoundException();
      }
      if (response.req.file) {
        return response.status(200).json({ url: response.req.file.location });
      }
      return response.status(404).json({ message: 'ErrorFileUpload' });
    });
  }

  upload = multer({
    storage: multerS3({
      s3: this.s3,
      bucket: process.env.SPACES_BUCKET,
      acl: 'public-read',
      contentType: (req, file, cb) => {
        cb(null, file.mimetype);
      },
      key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    }),
  }).single('file');
}
