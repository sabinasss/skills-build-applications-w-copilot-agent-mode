export function CollectionState({ error, loading }) {
  if (loading) return <p className="text-secondary">Loading...</p>
  if (error) return <p className="alert alert-danger">{error}</p>
  return null
}

export function CollectionTable({ columns, rows }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td className="text-secondary" colSpan={columns.length}>No records found.</td></tr>
          ) : rows.map((row) => (
            <tr key={row._id ?? JSON.stringify(row)}>
              {columns.map((column) => <td key={column}>{row[column] ?? '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
