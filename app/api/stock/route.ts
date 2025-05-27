import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  console.log('POST /api/stock recibida'); // <-- aquí

  try {
    console.log('POST /api/stock recibida'); 

    const { userId, products } = await request.json();

    if (!userId || !Array.isArray(products)) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    const stockPath = path.join(process.cwd(), 'stock.json');
    const stockRaw = await fs.readFile(stockPath, 'utf-8');
    const stockData = JSON.parse(stockRaw);

    // Descontar cantidades del stock
    products.forEach((item: any) => {
      stockData.categorias.forEach((cat: any) => {
        cat.productos.forEach((prod: any) => {
          if (prod.id === item.id) {
            prod.stock = Math.max(0, (prod.stock || 0) - item.cantidad);
          }
        });
      });
    });

    // Guardar cambios en stock.json
    await fs.writeFile(stockPath, JSON.stringify(stockData, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en la API /api/stock:', error); 

    return NextResponse.json({ success: false, error: error?.toString() }, { status: 500 });
  }
}
