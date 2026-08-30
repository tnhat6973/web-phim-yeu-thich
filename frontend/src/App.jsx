import "./css/App.css"
import Home from "./pages/Home.jsx" // importing the Home component from the pages folder to be used in the App component
import Favorites from "./pages/Favorites.jsx"
import NavBar from "./components/NavBar.jsx"

import {Routes, Route} from "react-router-dom" // importing the Routes and Route components from react-router-dom to be used for routing in the App component


function App() {

  return (
    <div>

      <NavBar />
      
      <main className="main-content">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/favorites" element={<Favorites />} />

        </Routes>
      </main>

    </div>

  )
}


export default App
