'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Room {
    sala_id: number;
    horario_id: number;
    data: string;
}

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        async function fetchRooms() {
            try {
                // Use o caminho relativo para o proxy funcionar
                const response = await fetch('/api/salas', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Garante que a resposta da API seja tratada de forma segura
                    setRooms(data?.data?.salas || []);
                } else {
                    setError('Falha ao carregar as salas. Tente novamente.');
                }
            } catch (err) {
                setError('Não foi possível conectar ao servidor.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchRooms();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-white">Carregando...</div>;
    }

    if (error) {
        return <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
                <h1 className="text-2xl font-bold">Salas Disponíveis</h1>
                <button
                    onClick={handleLogout}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                    Log-OUT
                </button>
            </header>
            <div>
                <h1>Funcionou</h1>
            </div>

        </div>
    );
}
