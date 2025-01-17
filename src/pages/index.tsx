import { Inter } from 'next/font/google';
import Dashboard from './dashboard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex w-full min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Dashboard />
    </main>
  );
}
