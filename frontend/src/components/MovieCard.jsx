import "../css/MovieCard.css"

function MovieCard({movie}) {

    function onfavoriteClick() {
        alert("Clicked")

    }


    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={movie.url} alt="{movie.title}" width="350px" height="500px"/>
            

                <div className="movie-overlay">
                    <button className="favorite-btn" onClick={onfavoriteClick}> 
                        ♡
                    </button>
                </div> 


                <div className="movie-info">
                    <h3> {movie.title} </h3>
                    <p> {movie.release_date} </p>

                </div>

            </div>

        </div>

    )

}

export default MovieCard