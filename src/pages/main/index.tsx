import { useContext, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { PokemonContext } from "../../hooks/usePokemon"
import { List } from "../list"
import { Container } from "./styles"


export const Main: React.FC = () => {

    const { nextPage, loading, pokemons } = useContext(PokemonContext)
    const [search, setSearch] = useState("")
    
    return (
        <Container>
            <div className="logo-searchbar"> 
                <span className="pointer">
                    <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapi logo" />
                </span>
                <div className="searchbar">
                    <label htmlFor="input-searchbar" className="sr-only">searchbar input</label>
                    <input 
                        type="text" 
                        id="input-searchbar" 
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => e.target.value[0] !== ' ' ? setSearch(e.target.value) : null}
                    />
                </div>  
            </div>
            <div className="list">
                {pokemons.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(search)).map((pokemon) => {
                    return (
                        <List 
                            key={pokemon.id}
                            name={pokemon.name}
                            id={pokemon.id}
                            abilities={pokemon.abilities}
                            image={pokemon.sprites.front_default}
                            types={pokemon.types}
                        />
                    )
                })}
            </div>
            
            <div className="button">
                <button onClick={nextPage} disabled={loading}>{loading ? "Loading..." : "Load more"}</button>
            </div>            
        </Container>
    )
}