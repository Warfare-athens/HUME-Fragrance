'use server';

import { db } from '@/lib/db';
import { products, productImages } from '@/lib/db/schema';
import { promises as fs } from 'fs';
import { join } from 'path';

export async function deleteAllProducts() {
  try {
    console.log('Fetching all product images for deletion...');
    const images = await db.select().from(productImages);

    console.log(`Found ${images.length} images to delete.`);

    // 1. Delete records from the database
    console.log('Deleting image records from the database...');
    await db.delete(productImages);

    console.log('Deleting product records from the database...');
    await db.delete(products);

    // 2. Delete actual image files from the filesystem
    console.log('Deleting image files from the filesystem...');
    const uploadsDir = join(process.cwd(), 'public');
    let deletedFiles = 0;

    for (const image of images) {
      try {
        // image.url is like '/uploads/oils/filename.png'
        const filePath = join(uploadsDir, image.url!);
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
        deletedFiles++;
      } catch (err: unknown) {
        // It's possible the file doesn't exist, so we log and continue
        if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
          console.warn(`File not found, skipping: ${image.url}`);
        } else {
          console.error(`Error deleting file ${image.url}:`, err);
        }
      }
    }

    const message = `Successfully deleted all products and ${deletedFiles} associated image files.`;
    console.log(message);
    return { success: true, message };

  } catch (error) {
    console.error('Error deleting all products:', error);
    return { error: 'Failed to delete all products due to an internal error.' };
  }
}
