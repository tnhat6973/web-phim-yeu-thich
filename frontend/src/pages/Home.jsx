import MovieCard from "../components/MovieCard.jsx"

import "../css/Home.css"

import { useState } from "react"

function Home () {
    // useState hook to manage the state of the search query
    const [searchQuery, setSearchQuery] = useState(""); 


    const movies = [
        {id: 1, title: "The Matrix", release_date: "1999-03-31"},
        {id: 2, title: "The Terminator", release_date: "1984-10-26"},
        {id: 3, title: "The Iron Man", release_date: "2008-04-14"},
        {id: 4, title: "The Avengers", release_date: "2012-05-04"},
    
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