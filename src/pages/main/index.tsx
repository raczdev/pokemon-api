import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../../hooks/usePokemon";
import { List } from "../list";
import { Container } from "./styles";

export const Main: React.FC = () => {
    const { nextPage, loading, pokemons, getPokemon } = useContext(PokemonContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Chama getPokemon quando o termo de busca muda
        const delayDebounceFn = setTimeout(() => {
            getPokemon(search);
        }, 300); // Adiciona um delay para evitar chamadas excessivas

        return () => clearTimeout(delayDebounceFn);
    }, [search, getPokemon]);

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
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>  
            </div>
            <div className="list">
                {pokemons.map((pokemon) => (
                    <List 
                        key={pokemon.id}
                        name={pokemon.name}
                        id={pokemon.id}
                        abilities={pokemon.abilities}
                        image={pokemon.sprites.front_default}
                        types={pokemon.types}
                    />
                ))}
            </div>
            
            <div className="button">
                <button onClick={nextPage} disabled={loading}>
                    {loading ? "Loading..." : "Load more"}
                </button>
            </div>            
        </Container>
    );
};
