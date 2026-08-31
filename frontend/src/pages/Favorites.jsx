import { useMovieContext } from "../hooks/useMovieContext.js"

import MovieCard from "../components/MovieCard.jsx"

import "../css/Favorites.css"

function Favorites() {
    const {favorites} = useMovieContext()

    if(favorites.length > 0) {
        return (
            <div className="favorites">
                <h2> Your Favorites </h2>

                <div className="movies-grid">
                        {favorites.map( (movie) => (
                            <MovieCard movie={movie} key={movie.id}/> 
                            )
                        )}
                </div>
            </div>
        )
    
    } else {

        return (
            
            <div className="favorites-empty">
                <h2> No Favorite Movies Yet </h2>
                <p> Click the ♡ button on a movie to add it to your favorites </p>

            </div>
        )
    }
}

export default Favorites