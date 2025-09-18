'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Room {
    id: number;
    nome: string;
    capacidade: number;
    descricao: string;
}

// Layout exemplo
const mockRooms: Room[] = [
    { id: 1, nome: 'Sala de Conferências A', capacidade: 20, descricao: 'Equipada com projetor e quadro branco.' },
    { id: 2, nome: 'Sala de Reunião B', capacidade: 8, descricao: 'Ideal para pequenas equipes e brainstorming.' },
    { id: 3, nome: 'Auditório Principal', capacidade: 150, descricao: 'Perfeito para grandes eventos e palestras.' },
    { id: 4, nome: 'Sala de Estudo Silenciosa', capacidade: 12, descricao: 'Ambiente tranquilo para foco e concentração.' },
    { id: 5, nome: 'Laboratório de Inovação', capacidade: 25, descricao: 'Contém equipamentos de prototipagem.' },
];

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        setRooms(mockRooms);
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
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
            <header className="flex items-center justify-between bg-gray-800 p-4 shadow-md">
                <h1 className="text-2xl font-bold">Salas Disponíveis</h1>
                <button
                    onClick={handleLogout}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                    Sair
                </button>
            </header>
            
            {/* Corpo da página com os cards */}
            <main className="container mx-auto max-w-5xl p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rooms.map((room) => (
                        <div key={room.id} className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:border-blue-500">
                            <h3 className="text-xl font-semibold text-white">{room.nome}</h3>
                            <p className="mt-2 text-gray-400">Capacidade: {room.capacidade} pessoas</p>
                            <p className="mt-4 text-sm text-gray-300">{room.descricao}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}