import { useEffect, useState } from "react";
import api from '../../Services/api';
import { Link } from 'react-router-dom';
import './home.css';

// URL DA Api: https://api.themoviedb.org/3/movie/now_playing?api_key=80b035e1ea3617a0fe2924c6fd215514&language=pt-br

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(()=>{ //Toda vez que o usuário abrir a página será carregado essas informações.
        async function loadFilmes() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "80b035e1ea3617a0fe2924c6fd215514",
                    language: "pt-BR",
                    page:1
                }
            })

        setFilmes(response.data.results.slice(0, 10)) //Estamos pegando apenas 10 dos resultados da array
       setLoading(false);
        }

        loadFilmes();

    }, []);

    if(loading) {
        return (
            <div className="loading">
               <div className="loader"></div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <div className="div-filmes">
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                                <Link to={`/filmes/${filme.id}`}>Acessar</Link>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;