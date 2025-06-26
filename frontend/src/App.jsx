
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/menu/menu';
import Footer from './components/footer/footer';
import FormularioTarefas from './pages/criarTarefa/criarTarefa';
import ListaDeTarefas from './pages/tarefas/tarefas';
import './assets/css/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <Menu />
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListaDeTarefas />} />
            <Route path="/criar-tarefa" element={<FormularioTarefas />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
