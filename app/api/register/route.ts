import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    
    if (!username || !email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'All fields are required.' 
      }, { status: 400 });
    }
    console.log('Datos recibidos:', { username, email, password });
    // Ruta al archivo db.json en la raíz del proyecto
    const dbPath = path.join(process.cwd(), 'db.json');
    
    let db;
    let users: User[] = [];

    try {
      // Intenta leer el archivo existente
      const dbData = await fs.readFile(dbPath, 'utf-8');
      db = JSON.parse(dbData);
      users = Array.isArray(db.users) ? db.users : [];
      console.log('Archivo leído exitosamente:', db);
    } catch (error) {
      // Si el archivo no existe, crea la estructura inicial
      console.log('Archivo no existe o error leyendo:', error);
      db = { users: [] };
      users = [];
    }

    // Verificar duplicados
    if (users.some((u: User) => u.email === email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email already registered.' 
      }, { status: 409 });
    }

    if (users.some((u: User) => u.username === username)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Username already taken.' 
      }, { status: 409 });
    }

    // Crear nuevo usuario
    const newId = users.length > 0 ? Math.max(...users.map((u: User) => u.id)) + 1 : 1;
    
    const newUser: User = {
      id: newId,
      username,
      email,
      password, // En producción deberías hashear la contraseña
      role: 'usuario',
     
    };

    // Agregar el nuevo usuario al array
    users.push(newUser);
    
    // Actualizar el objeto db
    db.users = users;

    // Escribir de vuelta al archivo
    try {
      await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
      console.log('Usuario guardado exitosamente:', newUser);
      console.log('Total usuarios en DB:', db.users.length);
    } catch (writeError) {
      console.error('Error escribiendo archivo:', writeError);
      return NextResponse.json({ 
        success: false, 
        message: 'Error saving user to database.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: newUser.id, 
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      },
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error', 
      error: error?.toString() 
    }, { status: 500 });
  }
}