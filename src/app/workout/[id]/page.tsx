'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Clock3, Flame, Heart, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import { getWorkout } from '@/lib/api';
import { Workout } from '@/lib/types';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutDetails({ params }: { params: { id: string } }) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { plan, saved, addToPlan, saveWorkout } = usePlan();

  useEffect(() => {
    getWorkout(params.id).then(setWorkout).finally(() => setLoading(false));
  }, [params.id]);

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(''), 2200);
  }

  if (loading) return <main className="mx-auto max-w-7xl px-5 py-20"><Loading /></main>;
  if (!workout) return <main className="mx-auto max-w-7xl px-5 py-20 text-center"><h1 className="text-4xl font-black">Workout not found</h1><Link href="/" className="mt-5 inline-block text-lime">Back to workouts</Link></main>;

  const alreadyPlanned = plan.some((item) => item.id === workout.id);
  const alreadySaved = saved.some((item) => item.id === workout.id);
  const planFull = plan.length >= 5;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <Link href="/" className="mb-7 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white"><ArrowLeft size={16} /> Back to library</Link>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="overflow-hidden rounded-3xl border border-line bg-zinc-900"><img src={workout.image} alt={workout.name} className="h-full min-h-[420px] w-full object-cover" /></div>
        <div>
          <div className="flex flex-wrap gap-2">{workout.muscleGroups.map((group) => <span key={group} className="rounded-full bg-lime px-3 py-1 text-xs font-black uppercase text-black">{group}</span>)}</div>
          <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight">{workout.name}</h1>
          <p className="mt-5 leading-7 text-zinc-400">{workout.description}</p>

          <div className="mt-7 grid grid-cols-2 border-y border-line sm:grid-cols-3">
            <Spec label="Equipment" value={workout.equipment} /><Spec label="Difficulty" value={workout.difficulty} /><Spec label="Sets" value={String(workout.sets)} /><Spec label="Reps" value={workout.reps} /><Spec label="Duration" value={`${workout.duration} min`} /><Spec label="Calories" value={`${workout.caloriesBurned} kcal`} /><Spec label="Rating" value={String(workout.rating)} />
          </div>

          <div className="mt-8"><h2 className="text-xl font-black uppercase">Instructions</h2><ol className="mt-4 space-y-3">{workout.instructions.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-zinc-800 font-bold text-white">{index + 1}</span>{item}</li>)}</ol></div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button disabled={alreadyPlanned || planFull} onClick={() => { if (addToPlan(workout)) showMessage('Added to today\'s plan'); else showMessage(planFull ? 'Today\'s plan is full' : 'Already in today\'s plan'); }} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3 text-sm font-black text-black disabled:cursor-not-allowed disabled:opacity-40"><Plus size={18} /> {alreadyPlanned ? 'Added to plan' : planFull ? 'Plan is full' : 'Add to today\'s plan'}</button>
            <button disabled={alreadySaved} onClick={() => { if (saveWorkout(workout)) showMessage('Saved for later'); else showMessage('Already saved'); }} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-600 px-5 py-3 text-sm font-black disabled:opacity-40"><Heart size={18} /> {alreadySaved ? 'Saved' : 'Save for later'}</button>
          </div>
        </div>
      </div>
      <Toast message={message} />
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-r border-line px-3 py-4"><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">{label}</p><p className="mt-1 text-sm font-semibold text-zinc-200">{value}</p></div>;
}
