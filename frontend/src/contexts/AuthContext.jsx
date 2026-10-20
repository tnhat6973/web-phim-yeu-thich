import { createContext, useState } from "react"
import { request } from "../services/backend.js"

const AuthContext = createContext()

// Lưu token + thông tin user vào localStorage để F5 không bị đăng xuất
const loadAuth = () => {
    try {
        return JSON.parse(localStorage.getItem("auth")) || { token: null, user: null }
    } catch {
        return { token: null, user: null }
    }
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(loadAuth)

    const login = async (email, password) => {
        const data = await request("/login", { method: "POST", body: { email, password } })
        const next = { token: data.token, user: data.user }
        localStorage.setItem("auth", JSON.stringify(next))
        setAuth(next)
    }

    // Đăng ký xong tự động đăng nhập luôn
    const register = async (username, email, password) => {
        await request("/register", { method: "POST", body: { username, email, password } })
        await login(email, password)
    }

    const logout = () => {
        localStorage.removeItem("auth")
        setAuth({ token: null, user: null })
    }

    const value = { user: auth.user, token: auth.token, login, register, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
