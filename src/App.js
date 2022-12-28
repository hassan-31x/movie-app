import React from "react";
import { useEffect,useState } from "react";
import './App.css'
import SearchIcon from './search.svg'

import Sidebar from './components/Sidebar.js'
import Movie from "./components/Movie.js";



const App = () => {
  const [movies,setMovies] = useState([]);  
  const [searchTerm,setSearchTerm] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const onClickMenuItem = (item) => {
    setSelectedMenuItem(item.toLowerCase());
    console.log(selectedMenuItem)
    // if (item = 'All') setSelectedMenuItem('')
  }
  const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=25f29436`
  
  
  const searchMovies = (name, category) => {
    const url = API_URL + name + category;
    console.log(url);
    return fetch(url)
      .then(result => result.json())
      .then(data => setMovies(data.Search))
      .catch(error => console.error(error));
  }

  useEffect( () => {
    searchMovies('&s=Avengers', '')
  },[])

  useEffect( () => {
    const temp = `&type=${selectedMenuItem || 'movie'}`
    searchMovies(`&s=${searchTerm || 'Avengers'}`, temp)
  },[selectedMenuItem])
  
  return (
    <div className="app">
      <Sidebar onClickMenuItem={onClickMenuItem} />
      <div className="right">
        <h1>Movie List</h1>
        
        <div className="search">
          <input placeholder="search for movie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <img src={SearchIcon} alt="search" onClick={ ()=> searchMovies(`&s=${searchTerm}`, `&type=${selectedMenuItem || 'movie'}`) } />
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
