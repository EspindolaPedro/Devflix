import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Services/api'
import '../Home/home.css';
import './filme-info.css';


function Filme() {
    const { id } = useParams();
    const navigate = useNavigate(); //um hooks para trativa de rotas

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key:"80b035e1ea3617a0fe2924c6fd215514",
                    language: "pt-BR",
                   
                }
            })
            .then((response)=>{
               setFilme(response.data);
               setLoading(false);
            })
            .catch(()=>{
               navigate("/", { replace: true }) // caso o usuário digitar um parâmetro de url que não existe irá retornar para a home
               return;
            })

        }
        loadFilmes();


        return () => {
            console.log("Componente desmontado")
        }
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@favoriteFilme');
        let savedMovies = JSON.parse(minhaLista) || []; 

        const hasMovie = savedMovies.some((savedMovies)=>savedMovies.id === filme.id )
            
        if(hasMovie) {
             alert("Já está salvo")
             return;
        }
        savedMovies.push(filme);
        localStorage.setItem('@favoriteFilme', JSON.stringify(savedMovies));

    }
    

    if(loading) {
        return (
            <div className="loading">
            <div className="loader"></div>
         </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{ filme.title }</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={ filme.title } />

        <h3>Sinopse</h3>
        <span>{ filme.overview }</span>

        <strong>Avaliação: { filme.vote_average.toFixed(1) } / 10 </strong>

        <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target='blank' rel="external" href={`https://youtube.com/results?search_query=${ filme.title } Trailer`} >Trailer</a>
            </button>
        </div>
        </div>
    )
}

export default Filme;