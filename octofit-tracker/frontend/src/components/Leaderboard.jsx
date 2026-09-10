import { CollectionState, CollectionTable } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

export default function Leaderboard() {
  const state = useCollection('leaderboard')
  return <section><h2>Leaderboard</h2><CollectionState {...state} /><CollectionTable columns={['rank', 'userId', 'points']} rows={state.rows} /></section>
}
