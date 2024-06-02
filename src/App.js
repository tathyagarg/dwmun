import logo from './logo.svg';
import Home from './pages/home';
import './App.css';

function App() {
  return <div>
    {/* This needs to become a dropdown on phone vvvv */}
    <nav className="navbar">
        LOGO
        Home
        Committees
        Registrations
    </nav>
    <Home></Home>
  </div>
}

export default App;
