import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [Isloading,setIsLoadind] = useState(false);
  const [error,setError] = useState();



      const fetchMoviesHandler = async()=>{
      setIsLoadind(true);
      try{
      const response = await fetch('https://swapi.dev/api/film/');
      if(!response.ok||response.results===0){
        setError('Oops something went wrong !');
        throw new Error('SomeThing went wrong !') 
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      }
      catch(error){
        setError(error.message);
      }
       setIsLoadind(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!Isloading &&!error&& <MoviesList  movies={movies} />}
        {Isloading && !error&&<h1>Loading.....</h1>}
        {error&&<h1>{error}</h1>}
      </section>
    </React.Fragment>
  );
}

export default App;
