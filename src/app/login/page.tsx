'use client';

/* bibliotecas */
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede que a página recaregue
    console.log('Dados do login:', { email, senha }); // teste
  };

  return (
    // Container principal
    <main className="flex min-h-screen items-center justify-center bg-zinc-900 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-white">
          Login
        </h1>
        
        {/* Formulário com espaçamento entre os elementos */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo de Email */}
          <div>
            <label 
              htmlFor="email" 
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          
          {/* Campo de Senha */}
          <div>
            <label 
              htmlFor="password" 
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>
          
          {/* Botão de Envio */}
          <button 
            type="submit" 
            className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Entrar
          </button>
        </form>

        {/* Divisor simples */}
        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 flex-shrink text-sm text-gray-400">Ou</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Link para a página de Registro */}
        <Link
          href="/register"
          className="block w-full rounded-md border border-gray-600 bg-transparent p-3 text-center text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Criar uma conta
        </Link>
      </div>
    </main>
  );
}