import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface GetRootResultsProps {
    id:number
    name: string;
    url: string;
    sprites: {
        front_default: string;
    }
    abilities?: {
        ability: {
            name: string,
        }
        name: string,
    }[] | undefined;  
    types?: {
        type: {
            name: string,
        }
    }[] | undefined;
}

interface ContextDataProps {
    pokemons: GetRootResultsProps[];
    nextPage: () => void,
    loading: boolean,
}

interface ProviderProps {
    children: ReactNode;
}

export const PokemonContext = createContext<ContextDataProps>({} as ContextDataProps)

export function PokemonProvider({children}: ProviderProps){
    const [pokemons, setPokemons] = useState<GetRootResultsProps[]>([])
    const [nextUrl, setNextUrl] = useState("")
    const [loading, setLoading] = useState(false)   

    useEffect(() => {
        const getPokemon = async () => {
            const res = await api.get('/pokemon/')
            console.log(res)
            setNextUrl(res.data.next)
            res.data.results.forEach(async (pokemon:GetRootResultsProps) => {
                const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                setPokemons((p) => [...p, poke.data])
            });
        }
        getPokemon()
    }, [])

    const nextPage = async () => {
        setLoading(true)
        let res = await axios.get(nextUrl);
        setNextUrl(res.data.next)
        res.data.results.forEach(async (pokemon:GetRootResultsProps) => {
            const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            setPokemons((p) => [...p, poke.data])
            setLoading(false)
        })
    }

    return (
        <PokemonContext.Provider value={{ pokemons, nextPage, loading}}>
            {children}
        </PokemonContext.Provider>
    )
}