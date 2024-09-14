import axios from "axios";
import { createContext, ReactNode, useState, useCallback } from "react";
import { api } from "../services/api";

interface GetRootResultsProps {
    id: number;
    name: string;
    url: string;
    sprites: {
        front_default: string;
    };
    abilities?: {
        ability: {
            name: string;
        };
        name: string;
    }[] | undefined;
    types?: {
        type: {
            name: string;
        };
    }[] | undefined;
}

interface ContextDataProps {
    pokemons: GetRootResultsProps[];
    nextPage: () => void;
    loading: boolean;
    getPokemon: (name?: string) => void;
}

interface ProviderProps {
    children: ReactNode;
}

export const PokemonContext = createContext<ContextDataProps>({} as ContextDataProps);

export function PokemonProvider({ children }: ProviderProps) {
    const [pokemons, setPokemons] = useState<GetRootResultsProps[]>([]);
    const [nextUrl, setNextUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [allPokemons, setAllPokemons] = useState<GetRootResultsProps[]>([]);

    const getPokemon = useCallback(async (name?: string) => {
        setLoading(true);
        try {
            if (name) {
                // Busque todos os Pokémons disponíveis para filtragem
                const res = await api.get('/pokemon', { params: { limit: 1000 } });
                const allPokemons = res.data.results;
                const filteredPokemons = await Promise.all(
                    allPokemons
                        .filter((pokemon: { name: string }) => pokemon.name.toLowerCase().includes(name.toLowerCase()))
                        .map(async (pokemon: { name: string }) => {
                            const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                            return poke.data;
                        })
                );
                setPokemons(filteredPokemons);
                setAllPokemons(allPokemons);
            } else {
                // Carregar todos os Pokémons
                const res = await api.get('/pokemon/');
                setNextUrl(res.data.next);
                const newPokemons = await Promise.all(
                    res.data.results.map(async (pokemon: GetRootResultsProps) => {
                        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                        return poke.data;
                    })
                );
                setPokemons(newPokemons);
                setAllPokemons(newPokemons);
            }
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const nextPage = async () => {
        if (!nextUrl) return; // Adiciona uma verificação para evitar chamadas se nextUrl estiver vazio.
        setLoading(true);
        try {
            const res = await axios.get(nextUrl);
            setNextUrl(res.data.next);
            const newPokemons = await Promise.all(
                res.data.results.map(async (pokemon: GetRootResultsProps) => {
                    const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    return poke.data;
                })
            );
            setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
        } catch (error) {
            console.error("Error fetching next page of Pokémon:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemons, nextPage, loading, getPokemon }}>
            {children}
        </PokemonContext.Provider>
    );
}
