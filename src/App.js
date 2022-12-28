import React from "react";
import { useEffect,useState } from "react";
import './App.css'
import SearchIcon from './search.svg'

import Sidebar from './components/Sidebar.js'
import Movie from "./components/Movie.js";


const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=25f29436"

const App = () => {


  const [movies,setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState([]);

  const serachMovies = async (title) =>{

    const result = await fetch(`${API_URL}&s=${title}`);  
    const data = await result.json();
    setMovies(data.Search);


  }

  useEffect( () => {
  
    serachMovies('Avengers')

  },[])
  
  return (
    <div className="app">
      <Sidebar />
      <div className="right">
        <h1>Movie Lisr</h1>
        
        <div className="search">
          <input placeholder="search for movie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <img src={SearchIcon} alt="search" onClick={ ()=> serachMovies(searchTerm) } />
        </div>

        {
          movies?.length > 0
          
          ?( <div className="container">
              { movies.map((movie) => {
                return  <Movie movie={movie} />         
              })
            } 
            </div>
          ) :(
            <div className="empty">
              <h2>No movie found</h2>
              </div>
          )
        }
      </div>
      
      
    </div>
  );
}

export default App;
