'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDownUp, ArrowRight, Dumbbell } from 'lucide-react';
import WorkoutCard from '@/components/WorkoutCard';
import Loading from '@/components/Loading';
import { getWorkouts } from '@/lib/api';
import { Workout } from '@/lib/types';

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('duration');
  const [error, setError] = useState('');

  useEffect(() => {
    getWorkouts().then(setWorkouts).catch(() => setError('Could not load workouts. Please try again.')).finally(() => setLoading(false));
  }, []);

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sort === 'calories') return b.caloriesBurned - a.caloriesBurned;
      if (sort === 'rating') return b.rating - a.rating;
      return a.duration - b.duration;
    });
  }, [workouts, sort]);

  return (
    <main>
      <section className=" mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_.95fr] md:items-center md:px-8 md:pt-20">
        <div>
          <div className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-lime"><Dumbbell size={15} /> WORKOUT LIBRARY</div>
          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl md:text-7xl">TRAIN WITH INTENT. LOG EVERY SET.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <a href="#library" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-black text-black transition hover:bg-white">BROWSE WORKOUTS <ArrowRight size={17} /></a>
        </div>
        <div className="overflow-hidden rounded-3xl border border-line bg-zinc-900">
          <img src="/assets/banner.png" alt="Workout" className="h-[330px] w-full object-cover md:h-[440px]" />
        </div>
      </section>

      <section id="library" className="mx-auto max-w-7xl scroll-mt-10 px-5 md:px-8">
        <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold tracking-[0.2em] text-lime">12 MOVES</p><h2 className="mt-2 text-4xl font-black uppercase">THE LIBRARY</h2><p className="mt-2 text-sm text-zinc-500">Twelve lifts covering every major muscle group.</p></div>
          <label className="flex items-center gap-2 self-start rounded-xl border border-line bg-panel px-3 py-2 text-sm text-zinc-300 sm:self-auto">
            <ArrowDownUp size={15} /> Sort By
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent font-bold outline-none"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select>
          </label>
        </div>

        {loading && <Loading />}
        {error && <p className="py-16 text-center text-red-400">{error}</p>}
        {!loading && !error && <div className="grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3">{sortedWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div>}
      </section>
    </main>
  );
}
