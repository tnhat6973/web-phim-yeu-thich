# 🎬 React Movie Web - TMDB Movie Discovery App

A modern React web application for discovering and managing your favorite movies using The Movie Database (TMDB) API. Built as a learning project to master React fundamentals and API integration.

## ✨ Features

- **Movie Discovery**: Browse popular movies fetched from TMDB API
- **Search Functionality**: Search for movies by title
- **Favorites Management**: Add/remove movies to/from your favorites list
- **Persistent Storage**: Favorites are saved to browser localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Fast & Efficient**: Built with Vite for rapid development and optimized builds
- **Clean UI**: Netflix-inspired dark theme with smooth animations

## 🛠️ Tech Stack

- **React** (19.2.8) - UI Library
- **Vite** (8.2.2) - Build Tool & Dev Server
- **React Router DOM** (7.18.3) - Client-side routing
- **CSS3** - Styling with responsive grid layouts
- **JavaScript (ES6+)** - Core language
- **TMDB API** - Movie data source

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx       # Individual movie card component
│   │   └── NavBar.jsx          # Navigation bar
│   ├── pages/
│   │   ├── Home.jsx            # Home page with search & popular movies
│   │   └── Favorites.jsx       # Favorites page
│   ├── contexts/
│   │   └── MovieContext.jsx    # Global favorites context
│   ├── hooks/
│   │   └── useMovieContext.js  # Custom hook for favorites context
│   ├── services/
│   │   └── api.js              # TMDB API integration
│   ├── css/
│   │   ├── App.css
│   │   ├── Home.css
│   │   ├── Favorites.css
│   │   ├── MovieCard.css
│   │   ├── Navbar.css
│   │   └── index.css
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── .env.local                  # Environment variables (API key)
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-movie-web/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🔑 API Setup

This project uses **The Movie Database (TMDB) API**. 

### Get Your API Key

1. Visit [TMDB Website](https://www.themoviedb.org/)
2. Sign up for a free account
3. Go to Settings → API
4. Copy your API Key
5. Create a `.env.local` file in the `frontend` directory:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
   **Note:** The `VITE_` prefix is required for Vite to expose the variable to the browser.

6. Restart your development server (`npm run dev`) for changes to take effect

7. The API key is automatically loaded from the environment variable in `src/services/api.js`

**⚠️ Important Security Notes:**
- **Never commit `.env.local` to git** - Add it to `.gitignore` (already included)
- **Never publish your API key publicly** - It can be abused and your quota may be consumed
- Environment variables with `VITE_` prefix are required by Vite to expose them to browser code
- Keep your API key secret and regenerate it if accidentally exposed
- Copy `.env.example` to `.env.local` and fill in your actual API key

## 📖 How to Use

### Home Page
- View trending/popular movies
- Search for movies by title
- Hover over a movie card and click the ♡ button to add to favorites

### Favorites Page
- View all your saved favorite movies
- Remove movies by clicking the ♡ button
- Favorites persist even after closing the browser

## 🎓 Learning Concepts Covered

This project demonstrates key React concepts:

- **Components**: Functional components with JSX
- **Hooks**: useState, useEffect, useContext
- **Context API**: Global state management for favorites
- **React Router**: Client-side routing (Home & Favorites pages)
- **API Integration**: Fetching data from external REST API
- **localStorage**: Client-side data persistence
- **Responsive Design**: CSS Grid & Media Queries
- **Error Handling**: Try-catch blocks for API calls
- **Conditional Rendering**: Show different UI based on state

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code quality checks

## 🎨 Features Explained

### Movie Card Component
Displays individual movie information with:
- Movie poster image
- Title and release date
- Favorite button with hover effects
- Smooth animations on interaction

### Context API for Favorites
- Global state management using React Context
- Add/remove movies from favorites
- Check if movie is favorited
- Automatically sync with localStorage

### API Service
- `getPopularMovies()` - Fetch trending movies
- `searchMovies(query)` - Search by movie title
- Error handling for failed requests
- JSON response parsing

## 🔧 Customization

### Change Movie Card Size
Modify the grid in CSS files:
```css
grid-template-columns: repeat(auto-fit, minmax(300px, auto));
```

## 🐛 Troubleshooting

**Movies not loading?**
- Check your API key in `api.js`
- Verify internet connection
- Check browser console for errors (F12)

**Favorites not persisting?**
- Clear browser cache
- Check localStorage is enabled
- Inspect Application tab → Storage → LocalStorage

**Styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server (npm run dev)

## 📚 Resources

- [React Documentation](https://react.dev)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a React learning project to master modern web development concepts.

---

**Happy Coding! 🚀**
