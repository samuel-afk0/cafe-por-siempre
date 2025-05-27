import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(dbData);
    type User = {
      id: number;
      username: string;
      email: string;
      password: string;
    };
    const user = (db.users as User[]).find((u) => u.email === email && u.password === password);
    if (user) {
      return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error', error: error?.toString() });
  }
}