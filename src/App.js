import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import SearcIcon from './search.svg';
import MovieCard from "./MovieCard";
//IP KEY : cf2afb80

const API_URL = 'https://www.omdbapi.com?apikey=cf2afb80';

const App = () => {
    const [searchTerm,  setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    const handleKeyEvent = (e)  => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }

    }

    
    useEffect(() => {
        searchMovies('Spider-Man');
    }, []);
    
    return (
        <div className="app">
            <h1>MovieHub</h1>

            <div className="search">
                <input
                    placeholder="Search any movie, you want!"
                    value= {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyEvent}
                />
                <img
                    src={SearcIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie = {movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            } 

            
        </div>
    );
}

export default App;
