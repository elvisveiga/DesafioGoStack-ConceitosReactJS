import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(function () {
    api.get('repositories').then(response => {
      setRepositories([...repositories, ...response.data]);
    })
  }, []);

  async function handleAddRepository() {
    const repository = {
      id: '',
      title: "Desafio ReactJS",
      url: 'http://rocketseat.com.br',
      techs: ['ReactJs', 'React Native', 'NodeJS']
    }

    const { data, status } = await api.post('repositories', repository);
    repository.id = data.id;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`);
    const currentRepositories = repositories.filter(repository => repository.id != id);
    setRepositories(currentRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
