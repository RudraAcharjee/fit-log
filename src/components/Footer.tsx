import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-[#0d0d0d]">
      <div className=" mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-2 font-bold tracking-[0.18em]"><Image src="/assets/logo.png" alt="FitLog logo" width={28} height={28} className="object-contain" /> FITLOG</div>
        <p className="text-sm text-zinc-500">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
