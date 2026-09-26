'use client';

import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm shadow-2xl">
      <CheckCircle2 size={17} className="text-lime" />
      {message}
    </div>
  );
}
