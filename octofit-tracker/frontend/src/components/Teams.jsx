import { CollectionState, CollectionTable } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

export default function Teams() {
  const state = useCollection('teams')
  return <section><h2>Teams</h2><CollectionState {...state} /><CollectionTable columns={['name', 'description', 'members']} rows={state.rows} /></section>
}
