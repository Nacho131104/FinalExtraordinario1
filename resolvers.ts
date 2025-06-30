import { GraphQLError } from "graphql";
import { Character } from "./types.ts"
import { House } from "./types.ts";


 type Charactersargs = {
    ids: string[]
 }
export const resolvers = {

    House:{
        characters:async(parent: House): Promise<Character[]> =>{

            const url = `https://hp-api.onrender.com/api/characters`
            const response = await fetch(url)
            if(!response.ok) throw new GraphQLError("Error en la url")
            const personajes: Character[] = await response.json();
            
            const personajesDeLacasa = personajes.filter((p)=>{p.house?.name == parent.name})
            return personajesDeLacasa
        }

    },


    Query: {
        getCharacter:async(_:unknown,{id}:{id:string}): Promise<Character|null>  =>{
            const url = `https://hp-api.onrender.com/api/character/${id}`;
            const response = await fetch(url);
            if(!response.ok) throw new GraphQLError("Error en la url");
            
            const data: Array<Character> = await response.json();
            const personaje = data[0];
            return personaje
        },

        getCharacters:async(_:unknown, args ?:Charactersargs ): Promise<Character[]> =>{
    
            const url = `https://hp-api.onrender.com/api/characters`
            const response = await fetch(url)
            if(!response.ok) throw new GraphQLError("Error en la url")
            const personajes: Character[] = await response.json();

            if(args){
                const personajesporid = personajes.filter((p)=> args.ids.find(p.id.toString))
                return personajesporid
            }
            return personajes
        }
    }
}