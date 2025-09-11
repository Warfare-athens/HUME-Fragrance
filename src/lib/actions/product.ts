'use server';

import { and, asc, count, desc, eq, ilike, or, sql, type SQL } from 'drizzle-orm';
import { db } from '@/lib/db';
import {
  products,
  users,
  reviews,
  productImages,
  type SelectProduct,
  insertProductSchema,
} from '@/lib/db/schema';

import { NormalizedProductFilters } from '@/lib/utils/query';
import { writeFile } from 'fs/promises';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

type ProductListItem = {
  id: string;
  title: string;
  price: string;
  imageUrl: string | null;
  createdAt: Date;
  subtitle?: string | null;
};

export type GetAllProductsResult = {
  products: ProductListItem[];
  totalCount: number;
};

export async function getAllProducts(filters: NormalizedProductFilters): Promise<GetAllProductsResult> {
  const conds: SQL[] = [eq(products.isPublished, true)];

  if (filters?.search) {
    const pattern = `%${filters.search}%`;
    conds.push(or(ilike(products.title, pattern), ilike(products.description, pattern))!);
  }

  const baseWhere = conds.length ? and(...conds) : undefined;

  const primaryOrder = desc(products.createdAt);

  const page = Math.max(1, filters?.page);
  const limit = Math.max(1, Math.min(filters?.limit, 60));
  const offset = (page - 1) * limit;

  const primaryImageSubquery = db
    .select({
      productId: productImages.productId,
      url: productImages.url,
    })
    .from(productImages)
    .where(eq(productImages.isPrimary, true))
    .as('primary_image');

  const rows = await db
    .select({
      id: products.id,
      title: products.title,
      price: products.price,
      createdAt: products.createdAt,
      subtitle: products.subtitle,
      imageUrl: primaryImageSubquery.url,
    })
    .from(products)
    .leftJoin(primaryImageSubquery, eq(primaryImageSubquery.productId, products.id))
    .where(baseWhere)
    .orderBy(primaryOrder, asc(products.id))
    .limit(limit)
    .offset(offset);

  const countRows = await db
    .select({
      cnt: count(sql<number>`distinct ${products.id}`),
    })
    .from(products)
    .where(baseWhere);

  const productsOut: ProductListItem[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    price: r.price,
    imageUrl: r.imageUrl,
    createdAt: r.createdAt,
    subtitle: r.subtitle,
  }));

  const totalCount = countRows[0]?.cnt ?? 0;

  return { products: productsOut, totalCount };
}

export type FullProduct = {
  product: SelectProduct & {
    images?: { url: string }[];
  };
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  title?: string;
  content: string;
  createdAt: string;
};

export type RecommendedProduct = {
  id: string;
  title: string;
  price: number | null;
  imageUrl: string;
};

export async function getProductReviews(productId: string): Promise<Review[]> {
  const rows = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(reviews)
    .innerJoin(users, eq(users.id, reviews.userId))
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt))
    .limit(10);

  return rows.map((r) => ({
    id: r.id,
    author: r.authorName?.trim() || r.authorEmail || 'Anonymous',
    rating: r.rating,
    title: undefined,
    content: r.comment || '',
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function addProduct(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const images = formData.getAll('images') as File[];

    if (!title || !description || isNaN(price) || images.length === 0) {
      return { error: 'Title, description, price, and at least one image are required.' };
    }

    const newProduct = insertProductSchema.parse({
      title,
      subtitle,
      description,
      price,
      isPublished: true, // Default to published
    });

    const [insertedProduct] = await db.insert(products).values(newProduct).returning();

    if (!insertedProduct) {
      return { error: 'Failed to add product.' };
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'oils');
    await fs.mkdir(uploadsDir, { recursive: true });

    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];
      const uniqueFileName = `${uuidv4()}-${imageFile.name}`;
      const filePath = join(uploadsDir, uniqueFileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await writeFile(filePath, buffer);
      const imageUrl = `/uploads/oils/${uniqueFileName}`;

      await db.insert(productImages).values({
        productId: insertedProduct.id,
        url: imageUrl,
        isPrimary: i === 0, // Set the first image as primary
      });
    }

    return { success: true, productId: insertedProduct.id };
  } catch (error) {
    console.error('Error adding product:', error);
    return { error: 'Failed to add product due to an internal error.' };
  }
}

export async function getProductById(productId: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));

  if (!product) {
    return null;
  }

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId))
    .orderBy(productImages.sortOrder);

  return { ...product, images };
}
