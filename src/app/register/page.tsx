'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estados para o feedback
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', content: 'Registro bem-sucedido! Redirecionando...' });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', content: data.message || 'Não foi possível realizar o registro.' });
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'Falha na comunicação com o servidor.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          
          {/* Bloco de Mensagens de Aviso */}
          {message.content && (
            <div className={`rounded-md p-3 text-center text-sm ${
              message.type === 'success' 
                ? 'bg-green-900/50 text-green-400' 
                : 'bg-red-900/50 text-red-400'
            }`}>
              {message.content}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:cursor-not-allowed disabled:bg-blue-800"
          >
            {isLoading ? 'Registrando...' : 'Registrar'}
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