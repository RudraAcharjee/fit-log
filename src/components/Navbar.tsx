'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="border-b border-line bg-[#090909]/95">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-[0.18em]">
          <Image src="/assets/logo.png" alt="FitLog logo" width={36} height={36} className="h-9 w-9 object-contain" />
          <span>FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          <Link className={`rounded-full px-4 py-2 text-sm ${pathname === '/' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`} href="/">Workout</Link>
          <Link className={`rounded-full px-4 py-2 text-sm ${pathname.startsWith('/my-plan') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`} href="/my-plan">My Plan</Link>
        </nav>

        <div className="flex items-center gap-2 text-xs font-bold">
          <Link href="/my-plan" className="rounded-full bg-lime px-3 py-2 text-black">Plan {plan.length}</Link>
          <Link href="/my-plan" className="rounded-full border border-zinc-600 px-3 py-2 text-zinc-200">Saved {saved.length}</Link>
        </div>
      </div>
      <div className="flex justify-center gap-2 border-t border-line px-5 py-2 sm:hidden">
        <Link href="/" className="px-4 py-1 text-sm text-zinc-300">Workout</Link>
        <Link href="/my-plan" className="px-4 py-1 text-sm text-zinc-300">My Plan</Link>
      </div>
    </header>
  );
}
