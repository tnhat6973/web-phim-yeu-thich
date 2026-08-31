import MovieCard from "../components/MovieCard.jsx"

import { useState, useEffect } from "react"

import { searchMovies, getPopularMovies } from "../services/api.js"

import "../css/Home.css"

function Home () {
    // useState hook to manage the state of the search query
    const [searchQuery, setSearchQuery] = useState("");

    // useState hook to manage the state of the movies
    const [movies, setMovies] = useState([]);

    // useState hook to manage the state of the error
    const [error, setError] = useState(null);

    // useState hook to manage the state of the loading
    const [loading, setLoading] = useState(true)

    // useEffect hook to fetch popular movies when the component mounts
    // structure of useEffect hook - useEffect(() => {}, [])
    // the first argument is a callback function that will be executed when the component mounts
    // the second argument is an array of dependencies that will trigger the callback function when they change
    // callback function - fetches the popular movies and updates the movies state
    // dependency array - empty array means the callback function will only be executed when the component mounts
    
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)

            } catch (err) {
                console.log(err)
                setError("Failed to load movies... ")

            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => { // anonymous-arrow function to handle the search functionality
        e.preventDefault(); // prevent the default form submission behavior 
        
        if (!searchQuery.trim()) return // if the search query is empty, return early

        if (loading) return // if the loading state is true, return early

        setLoading(true)

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)

        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")

        } finally {
            setLoading(false)
        }
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

                <button type="submit" className="search-btn"> 
                    Search 
                </button>

            </form>

            {error && <div className="error-message"> {error} </div>}


            {/* Conditional Rendering - show loading message while fetching data from API */}
            {/* if else syntax: { condition ? ( value if true ) : ( value if false ) } */}
            {loading ? (
                <div className="loading"> Loading... </div>
            ) : (
                <div className="movies-grid">
                    {movies.map( (movie) => (
                        <MovieCard movie={movie} key={movie.id}/> 
                        )
                    )}
                </div>
            )}



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