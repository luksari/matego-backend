import {
  Controller,
  Get,
  Post,
  UploadedFile,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { UploadService } from './upload/upload.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  async upload(@Req() req, @Res() res, @UploadedFile() file) {
    try {
      await this.uploadService.uploadFile(req, res);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error });
    }
  }
}
