'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Dados do registro:', { nome, email, senha });

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        console.log('Registro bem-sucedido!');
      } else {
        console.error('Erro no registro.');
      }
    } catch (error) {
      console.error('Falha na comunicação com a API:', error);
    }
  };

  return (
    // Container principal
    <main className="flex min-h-screen items-center justify-center bg-zinc-900 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-white">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Nome */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Nome:
            </label>
            <input
              type="text"
              id="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Seu nome completo"
              required
            />
          </div>

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

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Registrar
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-medium text-blue-400 hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </main>
  );
}