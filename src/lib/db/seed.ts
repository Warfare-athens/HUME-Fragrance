import { db } from '@/lib/db';
import {
  brands, categories, collections, productCollections,
  products,
  insertBrandSchema,
  insertCategorySchema, insertCollectionSchema, insertProductSchema,
  type InsertProduct,
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { mkdirSync, existsSync, cpSync } from 'fs';
import { join, basename } from 'path';
import { v4 as uuidv4 } from 'uuid';
type ProductRow = typeof products.$inferSelect;




const log = (...args: unknown[]) => console.log('[seed]', ...args);
const err = (...args: unknown[]) => console.error('[seed:error]', ...args);



function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed() {
  try {
    

    

    log('Seeding brand: Hume Fragrance');
    const brand = insertBrandSchema.parse({ name: 'Hume Fragrance', slug: 'hume-fragrance', logoUrl: undefined });
    {
      const exists = await db.select().from(brands).where(eq(brands.slug, brand.slug)).limit(1);
      if (!exists.length) await db.insert(brands).values(brand);
    }

    log('Seeding categories');
    const catRows = [
      { name: 'Essential Oils', slug: 'essential-oils', parentId: null },
      { name: 'Blends', slug: 'blends', parentId: null },
      { name: 'Singles', slug: 'singles', parentId: null },
    ].map((c) => insertCategorySchema.parse(c));
    for (const row of catRows) {
      const exists = await db.select().from(categories).where(eq(categories.slug, row.slug)).limit(1);
      if (!exists.length) await db.insert(categories).values(row);
    }

    log('Seeding collections');
    const collectionRows = [
      insertCollectionSchema.parse({ name: "Signature Scents", slug: 'signature-scents' }),
      insertCollectionSchema.parse({ name: 'New Arrivals', slug: 'new-arrivals' }),
    ];
    for (const row of collectionRows) {
      const exists = await db.select().from(collections).where(eq(collections.slug, row.slug)).limit(1);
      if (!exists.length) await db.insert(collections).values(row);
    }

    
    const oilsCat = (await db.select().from(categories).where(eq(categories.slug, 'essential-oils')))[0];
    const blendsCat = (await db.select().from(categories).where(eq(categories.slug, 'blends')))[0];
    const singlesCat = (await db.select().from(categories).where(eq(categories.slug, 'singles')))[0];
    const signature = (await db.select().from(collections).where(eq(collections.slug, 'signature-scents')))[0];
    const newArrivals = (await db.select().from(collections).where(eq(collections.slug, 'new-arrivals')))[0];

    const uploadsRoot = join(process.cwd(), 'public', 'uploads', 'oils');
    if (!existsSync(uploadsRoot)) {
      mkdirSync(uploadsRoot, { recursive: true });
    }

    const sourceDir = join(process.cwd(), 'public', 'oils');
    const productNames = [
      'Lavender Bloom', 'Eucalyptus Mist', 'Peppermint Burst', 'Sweet Orange', 'Tea Tree Power', 'Rosemary Focus',
      'Lemon Zest', 'Frankincense Gold', 'Chamomile Calm', 'Ylang Ylang Dream', 'Sandalwood Soul', 'Bergamot Bliss',
      'Jasmine Night', 'Clary Sage Spirit', 'Geranium Glow'
    ];

    const sourceImages = [
      'amber oil.png','cardamom oil.png','cinnamon oil.png','clove oil.png','ginger oil.png',
      'jasmine oil.png','lavender oil.png','Musk oil.png','oud oil.png','patchouli oil.png',
      'peppermint oil.png','rose oil.png','sandalwood oil.png','Tulsi oil.png','ylang yalng oil.png',
    ];

    log('Creating products with images');
    for (let i = 0; i < productNames.length; i++) {
      const name = productNames[i];
      const catPick = [oilsCat, blendsCat, singlesCat][randInt(0, 2)];
      const desc = `Discover the pure essence of ${name}.`;

      const pickName = sourceImages[i % sourceImages.length];
      const src = join(sourceDir, pickName);
      const destName = `${uuidv4()}-${basename(pickName)}`;
      const dest = join(uploadsRoot, destName);
      const imageUrl = `/uploads/oils/${destName}`;
      try {
        cpSync(src, dest);
      } catch (e) {
        err('Failed to copy product image', { src, dest, e });
      }

      const product = insertProductSchema.parse({
        name,
        description: desc,
        categoryId: catPick?.id ?? null,
        imageUrl,
        isPublished: true,
      });

      const retP = await db.insert(products).values(product as InsertProduct).returning();
      const insertedProduct = (retP as ProductRow[])[0];

      const collectionsForProduct: { id: string }[] = Math.random() < 0.5 ? [signature] : ([newArrivals, signature].filter(Boolean) as { id: string }[]);
      for (const col of collectionsForProduct) {
        await db.insert(productCollections).values({
          productId: insertedProduct.id,
          collectionId: col.id,
        });
      }

      log(`Seeded product ${name}`);
    }

    log('Seeding complete');
  } catch (e) {
    err(e);
    process.exitCode = 1;
  }
}

seed();