import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.js"
import "../css/Navbar.css"


function NavBar() {
    const { user, logout } = useAuth()

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <Link to="/"> Movie App </Link>
            </div>

            <div className="navbar-links">
                <Link to="/" className="nav-link"> Home </Link>

                <Link to="/favorites" className="nav-link"> Favorites </Link>

                {user ? (
                    <>
                        <span className="nav-user"> Xin chào, {user.username} </span>
                        <button className="nav-logout" onClick={logout}> Đăng xuất </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link"> Đăng nhập </Link>
                        <Link to="/register" className="nav-link"> Đăng ký </Link>
                    </>
                )}
            </div>

        </nav>
    )

}

export default NavBar
