import { Injectable } from '@nestjs/common';
import { FileResponse } from './dto/files.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './common/mfile.class';

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder);

    const res: FileResponse[] = [];

    for (const item of files) {
      await writeFile(`${uploadFolder}/${item.originalname}`, item.buffer);
      res.push({
        url: `${dateFolder}/${item.originalname}`,
        name: item.originalname,
      });
    }

    return res;
  }

  convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
