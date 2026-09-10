import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useCollection(endpoint) {
  const [state, setState] = useState({ rows: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchCollection(endpoint)
      .then((rows) => active && setState({ rows, loading: false, error: '' }))
      .catch((error) => active && setState({ rows: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [endpoint])

  return state
}
