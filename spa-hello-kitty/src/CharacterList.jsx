import React from 'react'

export default function CharacterList({ characters = [] }) {
  if (!characters.length) return <p>Nenhum personagem encontrado.</p>

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 12,
      marginTop: 12
    }}>
      {characters.map(c => (
        <article key={c.id} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <h3>{c.name}</h3>
          {c.alias && <p><strong>Apelido:</strong> {c.alias}</p>}
          <p>{c.description}</p>
        </article>
      ))}
    </div>
  )
}
