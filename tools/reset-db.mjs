/** Xoá database để lần chạy sau nạp lại dữ liệu demo từ data/seed.json. */
import { existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dbPath = join(here, '..', 'data', 'cuttayshop.db');

let removed = 0;
for (const suffix of ['', '-wal', '-shm']) {
  const file = dbPath + suffix;
  if (existsSync(file)) {
    rmSync(file, { force: true });
    removed++;
    console.log('đã xoá', file);
  }
}

console.log(removed ? '\nXong. Chạy `npm start` để nạp lại dữ liệu.' : 'Không có database nào để xoá.');
