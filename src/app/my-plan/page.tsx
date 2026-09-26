'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Clock3, Flame, Search, Star, X } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';
import { Workout } from '@/lib/types';
import Toast from '@/components/Toast';

export default function MyPlanPage() {
  const { plan, saved, done, removeFromPlan, removeSaved, markDone } = usePlan();
  const [tab, setTab] = useState<'plan' | 'saved'>('plan');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const list = tab === 'plan' ? plan : saved;
  const filtered = list.filter((item) => `${item.name} ${item.muscleGroups.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  const minutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const calories = plan.reduce((sum, item) => sum + item.caloriesBurned, 0);

  function toast(text: string) { setMessage(text); setTimeout(() => setMessage(''), 2200); }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div><p className="text-xs font-bold tracking-[0.2em] text-lime">YOUR LOG</p><h1 className="mt-2 text-5xl font-black uppercase">MY PLAN</h1><p className="mt-2 text-sm text-zinc-500">Cap of five lifts for today. Finish them, then load more.</p></div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2"><Search size={16} className="text-zinc-500" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workout..." className="w-44 bg-transparent text-sm outline-none placeholder:text-zinc-600" /></div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3"><Metric title="Exercises" value={plan.length} /><Metric title="Minutes" value={minutes} /><Metric title="Calories" value={calories} /></div>

      <div className="mt-10 flex gap-2 border-b border-line pb-3"><button onClick={() => setTab('plan')} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === 'plan' ? 'bg-white text-black' : 'text-zinc-500'}`}>Today&apos;s Plan ({plan.length})</button><button onClick={() => setTab('saved')} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === 'saved' ? 'bg-white text-black' : 'text-zinc-500'}`}>Saved ({saved.length})</button></div>

      {filtered.length === 0 ? <Empty tab={tab} /> : <div className="mt-6 space-y-4">{filtered.map((workout) => <PlanCard key={workout.id} workout={workout} isPlan={tab === 'plan'} isDone={done.includes(workout.id)} onRemove={() => { tab === 'plan' ? removeFromPlan(workout.id) : removeSaved(workout.id); toast('Workout removed'); }} onDone={() => { markDone(workout.id); toast('Workout marked as done'); }} />)}</div>}
      <Toast message={message} />
    </main>
  );
}

function Metric({ title, value }: { title: string; value: number }) { return <div className="rounded-2xl border border-line bg-panel p-5"><p className="text-xs uppercase tracking-wider text-zinc-600">{title}</p><p className="mt-2 text-3xl font-black">{value}</p></div>; }

function Empty({ tab }: { tab: 'plan' | 'saved' }) { return <div className="mt-10 rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center"><h2 className="text-2xl font-black uppercase">NOTHING HERE YET</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">{tab === 'plan' ? 'Browse the library and add a lift to get today moving.' : 'Save a workout from the library and it will show up here.'}</p><Link href="/" className="mt-6 inline-block rounded-full bg-lime px-5 py-3 text-sm font-black text-black">Go to workouts</Link></div>; }

function PlanCard({ workout, isPlan, isDone, onRemove, onDone }: { workout: Workout; isPlan: boolean; isDone: boolean; onRemove: () => void; onDone: () => void }) {
  return <div className="grid gap-4 rounded-2xl border border-line bg-panel p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
    <img src={workout.image} alt={workout.name} className="h-28 w-full rounded-xl object-cover sm:h-24" />
    <div><div className="flex flex-wrap gap-2">{workout.muscleGroups.map((group) => <span key={group} className="text-[10px] font-bold uppercase tracking-wider text-lime">{group}</span>)}</div><h3 className={`mt-1 text-xl font-black uppercase ${isDone ? 'text-zinc-500 line-through' : ''}`}>{workout.name}</h3><p className="mt-1 text-sm text-zinc-500">{workout.equipment}</p><div className="mt-3 flex gap-4 text-xs text-zinc-500"><span className="flex items-center gap-1"><Clock3 size={13} />{workout.duration}m</span><span className="flex items-center gap-1"><Flame size={13} />{workout.caloriesBurned}</span><span className="flex items-center gap-1"><Star size={13} />{workout.rating}</span></div></div>
    <div className="flex flex-wrap gap-2 sm:justify-end"><Link href={`/workout/${workout.id}`} className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-bold">View Details</Link>{isPlan && <button disabled={isDone} onClick={onDone} className="flex items-center gap-1 rounded-lg bg-lime px-3 py-2 text-xs font-bold text-black disabled:opacity-40"><Check size={14} /> {isDone ? 'Done' : 'Mark as Done'}</button>}<button onClick={onRemove} aria-label="Remove" className="rounded-lg border border-zinc-700 p-2 text-zinc-400 hover:text-white"><X size={16} /></button></div>
  </div>;
}
