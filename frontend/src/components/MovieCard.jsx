import { useNavigate } from "react-router-dom"
import { useMovieContext } from "../hooks/useMovieContext"
import { useAuth } from "../hooks/useAuth.js"
import "../css/MovieCard.css"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const { user } = useAuth()
    const navigate = useNavigate()

    const favorite = isFavorite(movie.id)

    async function onfavoriteClick(e) {
        e.preventDefault()

        // Chưa đăng nhập thì chuyển sang trang đăng nhập
        if (!user) {
            navigate("/login")
            return
        }

        try {
            if (favorite)
                await removeFromFavorites(movie.id)
            else
                await addToFavorites(movie)
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>

                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onfavoriteClick}> 
                        ♡
                    </button>
                </div> 
            </div>

            <div className="movie-info">
                <h3> {movie.title} </h3>
                <p> {movie.release_date?.split("-")[0]} </p>

            </div>

        </div>

    )
}

export default MovieCard
