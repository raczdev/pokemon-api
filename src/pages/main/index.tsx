import { FormEvent, useContext, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import { PokemonContext } from "../../hooks/usePokemon"
import { List } from "../list"
import { Container } from "./styles"


export const Main: React.FC = () => {

    const { nextPage, loading, pokemons, findPokemon, notFound } = useContext(PokemonContext)

    const [search, setSearch] = useState("")

    const handleSearch = (event: FormEvent) => {

        event.preventDefault();

        if (search !== "") {
            findPokemon(search)
            setSearch("")
        }
        if (notFound) {
            toast.warn("That is not a pokemon")
        }        
    }
    
    return (
        <Container>
            <div className="logo-searchbar"> 
                <a href="/">
                    <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapi logo" />
                </a>
                <form className="searchbar" onSubmit={handleSearch}>
                    <label htmlFor="input-searchbar" className="sr-only">searchbar input</label>
                    <input 
                        type="text" 
                        id="input-searchbar" 
                        placeholder="do your search!"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        disabled={(!search)}
                        type="submit"
                    >
                        search
                    </button>
                </form>  
            </div>
            <div className="list">
                {pokemons.map((pokemon) => {
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