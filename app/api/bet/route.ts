import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado. Iniciar sesión' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { matchId, pick, odd } = body;

    if (!matchId || !pick || !odd) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    console.log(`Apuesta registrada para ${session.user?.email}:`, {
      matchId,
      pick,
      odd
    });

    return NextResponse.json({
      success: true,
      message: 'Apuesta colocada con éxito',
      betId: Math.random().toString(36).substr(2, 9)
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
