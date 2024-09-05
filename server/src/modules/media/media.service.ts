import fs from 'node:fs/promises';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class MediaService {
  private readonly path = join(__dirname, '..', '..', '..', 'media');
  private readonly ext: string = 'jpg'

  async load(url: string) {
    try {
      const response = await fetch(url, { timeout: 20000 });
      const buffer = await response.buffer();

      const fileIds = await this.getFileIds();

      const index = (fileIds.length ? Math.max(...fileIds) : 0) + 1;

      await fs.writeFile(`${this.path}/${index}.${this.ext}`, buffer);

      return index;
    } catch (e) {
      return null;
    }
  }

  async remove(id: number) {
    await fs.unlink(`${this.path}/${id}.${this.ext}`)
  }

  private async getFileIds() {
    const fileNames = await fs.readdir(this.path);
    return fileNames
      .map((fileName) => {
        const id = Number(fileName.split('.')[0]);
        return Number.isNaN(id) ? -1 : id;
      })
      .filter((fileName) => fileName !== -1);
  }
}
