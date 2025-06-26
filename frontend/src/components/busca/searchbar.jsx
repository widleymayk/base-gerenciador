import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const LazyIcon = () => <FontAwesomeIcon icon={faSearch} />;

function SearchBar({ termoBusca, mudancaTermoBusca, naBusca }) {
  return (
    <div className="search-container" role="search" aria-label="Busca de Tarefas">
      <label htmlFor="search-input" className="sr-only">Buscar por título</label>
      
      <input
        id="search-input"
        type="text"
        placeholder="Buscar por título..."
        className="input-busca"
        value={termoBusca}
        onChange={(e) => mudancaTermoBusca(e.target.value)}
        aria-label="Campo de busca por título"
      />
      
      <button 
        type="button" 
        className="search-button" 
        onClick={naBusca} 
        aria-label="Iniciar busca"
      >
        <LazyIcon />
      </button>
    </div>
  );
}

// Definindo as PropTypes
SearchBar.propTypes = {
  termoBusca: PropTypes.string.isRequired, 
  mudancaTermoBusca: PropTypes.func.isRequired, 
  naBusca: PropTypes.func.isRequired, 
};

export default SearchBar;