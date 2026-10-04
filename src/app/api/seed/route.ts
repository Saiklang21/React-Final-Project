import { NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

const BLOB_FILENAME = 'users.json';

const SEED_USERS = [
  {
    id: 'usr-example-demo',
    email: 'example@cinemago.com',
    password: '$2b$10$/h5JHjeCBdkxsKKP4f08XOH2h0lIhak1Ykw1iieg3rPDK7zrRX6cO',
    name: 'Demo User',
  },
  {
    id: 'usr-bank-demo',
    email: 'bank@cinemago.com',
    password: '$2b$10$6NH9hhHQ1PLrimlyAt9gBu1fHCtbiUfSn1Njlht9n6.6dSkHQm4f6',
    name: 'สายกลาง จะวะนะ (แบงค์)',
  },
];

export async function GET() {
  // Only allow seeding if BLOB_READ_WRITE_TOKEN is set
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Not in Vercel environment' }, { status: 403 });
  }

  try {
    // Check if users.json already exists in Blob
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const existing = blobs.find((b) => b.pathname === BLOB_FILENAME);

    if (existing) {
      return NextResponse.json({ message: 'Already seeded', url: existing.url });
    }

    // Upload seed users
    const blob = await put(BLOB_FILENAME, JSON.stringify(SEED_USERS, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: false,
    });

    return NextResponse.json({ message: 'Seeded successfully', url: blob.url });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
