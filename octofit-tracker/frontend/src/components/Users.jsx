import { CollectionState, CollectionTable } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

export default function Users() {
  const state = useCollection('users')
  return <section><h2>Users</h2><CollectionState {...state} /><CollectionTable columns={['username', 'displayName', 'email']} rows={state.rows} /></section>
}
