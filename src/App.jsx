import './App.css'
import BlurMask from "./BlurMask.jsx"
import logo from "./assets/Logo.png"
import Search from './PokemonSearch.jsx';


function App() {
  return (
    <>
      <BlurMask/>
      <img src={logo} alt="Pokemon Search Logo" className='Logo' />
      <Search />
    </>
  );
}

export default App
