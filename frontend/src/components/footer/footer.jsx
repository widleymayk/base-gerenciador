import './footer.css';

function Footer() {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className="footer">
      &copy; {anoAtual} Task Senac. Todos os direitos reservados.
    </footer>
  );
}

export default Footer;
