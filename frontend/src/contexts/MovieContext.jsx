import { useState, useEffect } from "react"

import { createContext } from "react"

const MovieContext = createContext()

// MovieProvider component - provides the context value to its children
// purpose - allows components to access the context value without having to wrap them in a Consumer component
// {children} - props.children is a special prop that allows components to pass children elements to the component
// children is anything that is inside of the component that is being rendered, in this case, the children are the components that are wrapped in the MovieProvider component

export const MovieProvider = ({children}) => {

    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites")
        return storedFavs ? JSON.parse(storedFavs) : []
    })


    {/* below useEffect for saving favorites to localStorage */}

    useEffect(() => {
        {/* JSON.stringify - converts a JavaScript object to a JSON string */}
        localStorage.setItem("favorites", JSON.stringify(favorites))

    }, [favorites])

    {/* addToFavorites - adds a movie to the favorites array */}
    {/* ...prev - spreads the previous state into the new array */}
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])

    }

    {/* removeFromFavorites - removes a movie from the favorites array */}
    {/* prev.filter() - filters the previous state to exclude the movie with the given ID */}
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))

    }

    {/* isFavorite - checks if a movie is in the favorites array */}
    {/* favorites.some() - checks if at least one element in the array satisfies the provided condition */}
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)

    }

    {/* value - object that contains the context value that will be provided to the children components */}
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite

    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieContext

