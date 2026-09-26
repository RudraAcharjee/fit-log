'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Workout } from '@/lib/types';

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  addToPlan: (workout: Workout) => boolean;
  saveWorkout: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('fitlog-plan');
      const savedLater = localStorage.getItem('fitlog-saved');
      const savedDone = localStorage.getItem('fitlog-done');
      if (savedPlan) setPlan(JSON.parse(savedPlan));
      if (savedLater) setSaved(JSON.parse(savedLater));
      if (savedDone) setDone(JSON.parse(savedDone));
    } catch {
      // keep The empty state if old local data is not valid
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem('fitlog-plan', JSON.stringify(plan));
    localStorage.setItem('fitlog-saved', JSON.stringify(saved));
    localStorage.setItem('fitlog-done', JSON.stringify(done));
  }, [plan, saved, done, ready]);

  function addToPlan(workout: Workout) {
    if (plan.length >= 5 || plan.some((item) => item.id === workout.id)) return false;
    setPlan((current) => [...current, workout]);
    return true;
  }

  function saveWorkout(workout: Workout) {
    if (saved.some((item) => item.id === workout.id)) return false;
    setSaved((current) => [...current, workout]);
    return true;
  }

  function removeFromPlan(id: number) {
    setPlan((current) => current.filter((item) => item.id !== id));
  }

  function removeSaved(id: number) {
    setSaved((current) => current.filter((item) => item.id !== id));
  }

  function markDone(id: number) {
    setDone((current) => current.includes(id) ? current : [...current, id]);
  }

  return (
    <PlanContext.Provider value={{ plan, saved, done, addToPlan, saveWorkout, removeFromPlan, removeSaved, markDone }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used inside PlanProvider');
  return context;
}
