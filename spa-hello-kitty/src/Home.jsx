import React, { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/api/characters')
      .then(res => res.json())
      .then(data => setCharacters(data))
      .catch(err => console.error('Erro ao buscar API', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Carregando...</p>

  return <CharacterList characters={characters} />
}
