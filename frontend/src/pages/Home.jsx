import MovieCard from "../components/MovieCard.jsx"

import "../css/Home.css"

import { useState } from "react"

function Home () {
    // useState hook to manage the state of the search query
    const [searchQuery, setSearchQuery] = useState(""); 





    const movies = [
        {id: 1, title: "The Matrix", release_date: "1999-03-31", url: "https://i.pinimg.com/474x/da/d6/27/dad6276aee9d462f32b300529e748821.jpg"},
        {id: 2, title: "The Terminator", release_date: "1984-10-26", url: "https://i.pinimg.com/474x/4a/3f/1d/4a3f1dd232259b3686d3a62702a0335e.jpg"},
        {id: 3, title: "The Iron Man", release_date: "2008-04-14", url: "https://i.pinimg.com/736x/b0/30/b2/b030b2ffff3638265c52f16f484f894c.jpg"},
        {id: 4, title: "The Avengers", release_date: "2012-05-04", url: "https://i.pinimg.com/1200x/8d/37/3d/8d373d8524cd57a5d1c477b7044ef777.jpg"},
    
    ];

    const handleSearch = (e) => { // anonymous-arrow function to handle the search functionality
        e.preventDefault(); // prevent the default form submission behavior - 
        alert(searchQuery) // alert the search query when the form is submitted

    }

    return (
        <div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input 
                 type="text" 
                 placeholder="Search for a movie..." 
                 className="search-input" 
                 value={searchQuery} 
                 onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button type="submit" className="search-btn"> Search </button>

            </form>


             <div className="movies-grid">
                {movies.map(
                    (movie) => 
                        (
                        <MovieCard movie={movie} key={movie.id}/> 
                        )
                )}
            </div>



            {/* Conditional Rendering - method 02 - show movie if it matches (beginning with) the search query
            <div className="movies-grid">
                {movies.map((movie) =>
                    movie.title.toLowerCase().startsWith(searchQuery) && (
                        <MovieCard movie={movie} key={movie.id}/> 
                    )
                )}
            </div> */}

            {/* rendering the UI components - method 01 */}
            {/* <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div> */}

        </div>
    )
}

export default Home