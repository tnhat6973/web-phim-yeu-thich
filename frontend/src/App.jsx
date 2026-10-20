import Home from "./pages/Home.jsx" // importing the Home component from the pages folder to be used in the App component
import Favorites from "./pages/Favorites.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { MovieProvider} from "./contexts/MovieContext.jsx"
import NavBar from "./components/NavBar.jsx"
import {Routes, Route} from "react-router-dom" // importing the Routes and Route components from react-router-dom to be used for routing in the App component
import "./css/App.css"

function App() {

  return (
    <AuthProvider>
      <MovieProvider>

        <NavBar />
        
        <main className="main-content">
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

          </Routes>
        </main>

      </MovieProvider>
    </AuthProvider>

  )
}

export default App
