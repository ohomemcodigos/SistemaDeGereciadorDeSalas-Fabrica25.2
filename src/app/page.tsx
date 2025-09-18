import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-4 text-white">
      <div className="w-full max-w-2xl text-center">
        
        {/* Título Principal */}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Sistema de Gerenciamento de Salas
        </h1>

        {/* Parágrafo Descritivo */}
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Bem-vindo à nossa plataforma. Encontre e reserve salas de reunião, 
          estudo ou eventos de forma simples e rápida. Acesse sua conta ou 
          crie um novo cadastro para começar.
        </p>

        {/* Botões de Ação */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Fazer Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold leading-6 text-gray-300 transition hover:text-white"
          >
            Criar uma conta <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
}