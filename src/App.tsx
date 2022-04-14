import { PokemonProvider } from "./hooks/usePokemon";
import { Main } from "./pages/main";
import { GlobalStyle } from "./styles/globa.styles";
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <PokemonProvider>
      <GlobalStyle />
      <Main />
      <ToastContainer />
    </PokemonProvider>
  );
}

export default App;
