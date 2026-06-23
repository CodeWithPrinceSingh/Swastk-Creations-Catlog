// Bulk-import categories from a CSV file into MongoDB.
//
// Usage:
//   1. Make sure server/.env has DATA_SOURCE=mongo and a valid MONGO_URI
//   2. Put your CSV at server/src/data/categories-import.csv
//      (or pass a custom path: npm run import-categories -- /path/to/file.csv)
//   3. Run: npm run import-categories
//
// This script does NOT delete any existing categories — it only adds new
// ones. If a category with the same name already exists, it is skipped
// (not duplicated), so it's safe to re-run the same CSV.

import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import mongoose from 'mongoose';
import Category from '../models/Category.js';

const csvPath = process.argv[2] || path.join(process.cwd(), 'src/data/categories-import.csv');

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not set in your .env file.');
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found at: ${csvPath}`);
    console.error('   Place your file there, or run: npm run import-categories -- /path/to/file.csv');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const raw = fs.readFileSync(csvPath, 'utf-8');
  const rows = parse(raw, { columns: true, skip_empty_lines: true, trim: true });

  console.log(`📄 Found ${rows.length} row(s) in CSV`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const [index, row] of rows.entries()) {
    const rowNum = index + 2; // +2 because row 1 is the header, humans count from 1
    try {
      if (!row.name) {
        console.warn(`⚠️  Row ${rowNum}: missing name — skipped.`);
        skipped++;
        continue;
      }

      const slug = slugify(row.name);

      const alreadyExists = await Category.findOne({ slug });
      if (alreadyExists) {
        console.warn(`⚠️  Row ${rowNum}: "${row.name}" already exists — skipped.`);
        skipped++;
        continue;
      }

      await Category.create({
        name: row.name,
        slug,
        image: row.image || '',
      });

      created++;
      console.log(`   ✅ Row ${rowNum}: "${row.name}" imported.`);
    } catch (err) {
      failed++;
      console.error(`   ❌ Row ${rowNum}: failed — ${err.message}`);
    }
  }

  console.log('');
  console.log(`Done. Imported: ${created}, Skipped: ${skipped}, Failed: ${failed}`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
