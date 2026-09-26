import Link from 'next/link';

export default function NotFound() {
  return <main className="grid min-h-[65vh] place-items-center px-5 text-center"><div><p className="text-sm font-bold tracking-[0.2em] text-lime">404</p><h1 className="mt-2 text-5xl font-black uppercase">Workout not found</h1><p className="mt-3 text-zinc-500">The page you are looking for does not exist.</p><Link href="/" className="mt-7 inline-block rounded-full bg-lime px-5 py-3 text-sm font-black text-black">Back to workouts</Link></div></main>;
}
