import { useState, useEffect, createContext } from "react"
import { useAuth } from "../hooks/useAuth.js"
import { request } from "../services/backend.js"

const MovieContext = createContext()

// Chuyển 1 dòng trong bảng favorites (MySQL) về dạng object phim mà MovieCard đang dùng
const rowToMovie = (row) => ({
    id: row.movie_id,
    title: row.title,
    poster_path: row.poster_path,
    release_date: row.release_date,
})

export const MovieProvider = ({children}) => {
    const { token } = useAuth()
    const [savedFavorites, setSavedFavorites] = useState([])

    // Mỗi khi đăng nhập (token đổi) thì tải danh sách yêu thích của user đó từ MySQL
    useEffect(() => {
        if (!token) return

        request("/favorites", { token })
            .then(rows => setSavedFavorites(rows.map(rowToMovie)))
            .catch(err => console.log(err))
    }, [token])

    // Chưa đăng nhập thì không có favorites
    const favorites = token ? savedFavorites : []

    const addToFavorites = async (movie) => {
        await request("/favorites", {
            method: "POST",
            token,
            body: {
                movie_id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
            },
        })
        setSavedFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = async (movieId) => {
        await request(`/favorites/${movieId}`, { method: "DELETE", token })
        setSavedFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

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
