import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic text-green-500 tracking-tighter mb-2">
            BETDAY{' '}
            <span className="text-white tracking-normal not-italic font-light">
              LITE
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            Ingresa para gestionar tus apuestas simuladas
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-xs text-slate-600">
          Este es un entorno de prueba. Puedes usar cualquier credencial para
          entrar.
        </p>
      </div>
    </main>
  );
}
