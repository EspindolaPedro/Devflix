import './favoritos.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Trash from './icon/sorrindo.png'; 

function Favoritos() {

    const [filme, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@favoriteFilme");
        setFilmes(JSON.parse(minhaLista) || [])
    },[]);

    const deletarItem = (filmeId) => {
        const novaLista = filme.filter(filme => filme.id !== filmeId);

        setFilmes(novaLista);
        localStorage.setItem("@favoriteFilme", JSON.stringify(novaLista));
    }

    return (
        <div className='savedMovies'>
           <h1>Filmes favoritos</h1>
           <ul>
            {filme.map((item)=>{
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                    <Link className='details' to={`/filmes/${item.id}`}>Ver detalhes</Link>
                    <a onClick={() => deletarItem(item.id) }><img className='imgBtn' src={Trash} alt="trash icon"/></a>
                        </div>
                    </li>
                )
            })}
            </ul> 
        </div>
    )
}

export default Favoritos;