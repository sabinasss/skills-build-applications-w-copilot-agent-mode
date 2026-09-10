import { CollectionState, CollectionTable } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

export default function Activities() {
  const state = useCollection('activities')
  return <section><h2>Activities</h2><CollectionState {...state} /><CollectionTable columns={['type', 'durationMinutes', 'points', 'recordedAt']} rows={state.rows} /></section>
}
