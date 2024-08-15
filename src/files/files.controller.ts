import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileResponse } from './dto/files.response';
import { FilesService } from './files.service';
import { MFile } from './common/mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileResponse[]> {
    const mFileArray: MFile[] = [new MFile(file)];

    if (file.mimetype.includes('image')) {
      const webP = await this.filesService.convertToWebP(file.buffer);
      mFileArray.push({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer: webP,
      });
    }
    return this.filesService.saveFiles(mFileArray);
  }
}
