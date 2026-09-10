import { CollectionState, CollectionTable } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

// Codespaces API: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
export default function Workouts() {
  const state = useCollection('workouts')
  return <section><h2>Workouts</h2><CollectionState {...state} /><CollectionTable columns={['name', 'description', 'difficulty', 'durationMinutes']} rows={state.rows} /></section>
}
