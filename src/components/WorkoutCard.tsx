import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';
import { Workout } from '@/lib/types';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-panel transition hover:-translate-y-1 hover:border-zinc-600">
      <Link href={`/workout/${workout.id}`} className="block">
        <div className="relative h-56 overflow-hidden bg-zinc-900">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black"
              >
                {group}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-black uppercase tracking-tight">
            {workout.name}
          </h3>
          <p className="mt-2 truncate text-sm text-zinc-500">
            {workout.equipment}
          </p>

          <div className="mt-5 grid grid-cols-3 border-t border-line pt-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock3 size={14} /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={14} /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center justify-end gap-1">
              <Star size={14} /> {workout.rating}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
