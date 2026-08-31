import { useContext } from "react"
import MovieContext from "../contexts/MovieContext.jsx"

export const useMovieContext = () => useContext(MovieContext)