import "./paginacao.css";

// Componente Paginacao responsável por renderizar a barra de navegação de páginas
const Paginacao = ({ itemsPorPagina, totalItems, pagina, paginaAtual }) => {
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);

  // Função para navegar para a página anterior
  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      pagina(paginaAtual - 1);
    }
  };

  // Função para navegar para a próxima página
  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      pagina(paginaAtual + 1);
    }
  };

  // Função para navegar para a primeira página
  const irParaPrimeiraPagina = () => {
    if (paginaAtual !== 1) {
      pagina(1);
    }
  };

  // Função para navegar para a última página
  const irParaUltimaPagina = () => {
    if (paginaAtual !== totalPaginas) {
      pagina(totalPaginas);
    }
  };

  // Função para renderizar os números de páginas com lógica condicional
  const renderNumerosDePaginas = () => {
    const paginasParaMostrar = [];
    const maximoDePaginasParaMostrar = window.innerWidth <= 576 ? 3 : 5;

    let startPage = Math.max(1, paginaAtual - Math.floor(maximoDePaginasParaMostrar / 2));
    let endPage = Math.min(totalPaginas, startPage + maximoDePaginasParaMostrar - 1);

    // Ajuste se estiver nos primeiros elementos
    if (endPage === totalPaginas) {
      startPage = Math.max(1, endPage - maximoDePaginasParaMostrar + 1);
    }

    // Ajuste se estiver nos últimos elementos
    if (startPage === 1) {
      endPage = Math.min(totalPaginas, startPage + maximoDePaginasParaMostrar - 1);
    }

    // Renderizar as páginas
    for (let i = startPage; i <= endPage; i++) {
      paginasParaMostrar.push(
        <li key={i} className={`page-item ${i === paginaAtual ? 'active' : ''}`}>
          <button
            onClick={() => pagina(i)}
            className="page-link"
            aria-current={i === paginaAtual ? "page" : undefined}
          >
            {i}
          </button>
        </li>
      );
    }

    return paginasParaMostrar;
  };

  return (
    <nav>
      <ul className="paginacao">
        {/* Botão para a primeira página */}
        <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
          <button
            onClick={irParaPrimeiraPagina}
            className="page-link"
            aria-label="Primeira página"
            disabled={paginaAtual === 1}
          >
            &lt;&lt;
          </button>
        </li>

        {/* Botão de Voltar */}
        <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
          <button
            onClick={irParaPaginaAnterior}
            className="page-link"
            aria-label="Página anterior"
            disabled={paginaAtual === 1}
          >
            &lt;
          </button>
        </li>

        {/* Renderizar os números de páginas */}
        {renderNumerosDePaginas()}

        {/* Botão de Avançar */}
        <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
          <button
            onClick={irParaProximaPagina}
            className="page-link"
            aria-label="Próxima página"
            disabled={paginaAtual === totalPaginas}
          >
            &gt;
          </button>
        </li>

        {/* Botão para a última página */}
        <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
          <button
            onClick={irParaUltimaPagina}
            className="page-link"
            aria-label="Última página"
            disabled={paginaAtual === totalPaginas}
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacao;
