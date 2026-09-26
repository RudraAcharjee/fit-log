import { Workout } from './types';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error('Could not load workouts');
  return response.json();
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
  if (!response.ok) return null;
  return response.json();
}
