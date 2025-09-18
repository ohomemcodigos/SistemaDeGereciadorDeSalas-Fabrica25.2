'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estados para feedback visual
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // Ativa o estado de carregamento
    setError('');     // Limpa erros anteriores

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          
          // FLAG no console para confirmar o sucesso
          console.log(
            '%c[AUTH] Login computado com sucesso!',
            'color: #22c55e; font-weight: bold; padding: 2px 4px; border-radius: 3px; background-color: #1f2937;'
          );

          router.push('/rooms');
        }
      } else {
        const errorData = await response.json();
        // Define a mensagem de erro para ser exibida na tela
        setError(errorData.message || 'Email ou senha inválidos.');
      }
    } catch (error) {
      // Define uma mensagem de erro genérica para falhas de rede
      setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false); // Desativa o carregamento, independente do resultado
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-white">
          Login
        </h1>
        
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
          
          {/* Mensagem de Erro (aparece condicionalmente) */}
          {error && (
            <div className="rounded-md bg-red-900/50 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}
          
          {/* Botão de Envio com lógica de carregamento */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:cursor-not-allowed disabled:bg-blue-800"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Divisor */}
        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 flex-shrink text-sm text-gray-400">Ou</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Link para Registro */}
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