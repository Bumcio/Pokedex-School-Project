import axios from "axios";
import noImage from "./assets/question.webp"
import { useEffect, useState } from 'react';

export default function Search() {
    const [data, setData] = useState();
    const [name, setName] = useState();
    const [types, setTypes] = useState([]);
    const [sprite, setSprite] = useState(noImage);
    const [number, setNumber] = useState(1);
    const [weight, setWeight] = useState();
    const [hp, setHp] = useState();
    const [attack, setAttack] = useState();
    const [defense, setDefense] = useState();
    const [searchQuery, setSearchQuery] = useState();

    const myurl = `https://pokeapi.co/api/v2/pokemon/${number}`;

    useEffect(() => {
        axios.get(myurl)
            .then((response) => {
                setData(response.data);
                setName(response.data.name);
                setTypes(response.data.types);
                setWeight(response.data.weight);
                setSprite(response.data.sprites.front_default);

                const stats = response.data.stats;
                setHp(stats.find(stat => stat.stat.name === 'hp')?.base_stat);
                setAttack(stats.find(stat => stat.stat.name === 'attack')?.base_stat);
                setDefense(stats.find(stat => stat.stat.name === 'defense')?.base_stat);
            })
            .catch((err) => {
                window.alert(err);
            });
    }, [number]);

    function SearchPokemon(){
        let changedQuery = searchQuery.toString().toLowerCase()
        setNumber(changedQuery)
    }

    function RandomPokemon() {
        let random = Math.floor(Math.random() * 1025) + 1;
        console.log(random);
        setNumber(random);
    }



    return (
        <div className="Search-Background">
            <div className="Search-Container">
                <h1 className="Pixel-Text">Wyszukaj Pokemona!</h1>

                <div className="Pokemon-Input-Container">
                    <input type="text" placeholder="Wpisz nazwę albo numer pokemona" className="Pokemon-Input" onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button className="Pokemon-Button" onClick={SearchPokemon}>Szukaj</button>
                    <button className="Pokemon-Button" onClick={RandomPokemon}>Wylosuj</button>
                </div>

                <div className="Pokemon-Result">
                    <div className="Pokemon-Image">
                        <img src={sprite} alt="Zdjęcie pokemona" className="Pokemon-Picture" />
                    </div>

                    <div className="Pokemon-Stats">
                        <span className="Name">Name <p>{name}</p></span>
                        <span className="Type">Type 
                            {types.map((v, k) => (
                                <p key={k}>{v.type.name}</p>
                            ))}
                        </span>
                        <span className="Weight">Weight <p>{weight}</p></span>
                        <span className="HP">HP <p>{hp}</p></span>
                        <span className="Attack">Attack <p>{attack}</p></span>
                        <span className="Defense">Defense <p>{defense}</p></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
