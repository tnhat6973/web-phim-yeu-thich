import { Link } from "react-router-dom"
import { useMovieContext } from "../hooks/useMovieContext.js"
import { useAuth } from "../hooks/useAuth.js"
import MovieCard from "../components/MovieCard.jsx"
import "../css/Favorites.css"

function Favorites() {
    const {favorites} = useMovieContext()
    const { user } = useAuth()

    if (!user) {
        return (
            <div className="favorites-empty">
                <h2> Bạn chưa đăng nhập </h2>
                <p> <Link to="/login"> Đăng nhập </Link> để xem và lưu phim yêu thích của bạn </p>
            </div>
        )
    }

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
