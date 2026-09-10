import { CollectionState, CollectionTable } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

// Codespaces API: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
export default function Leaderboard() {
  const state = useCollection('leaderboard')
  return <section><h2>Leaderboard</h2><CollectionState {...state} /><CollectionTable columns={['rank', 'userId', 'points']} rows={state.rows} /></section>
}
