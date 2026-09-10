import { CollectionState, CollectionTable } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

// Codespaces API: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
export default function Users() {
  const state = useCollection('users')
  return <section><h2>Users</h2><CollectionState {...state} /><CollectionTable columns={['username', 'displayName', 'email']} rows={state.rows} /></section>
}
