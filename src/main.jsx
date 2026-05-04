import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import BookForm from './components/bookForm/BookForm'
import BookTable from './components/bookTable/BookTable'
import BookDetails from './components/bookDetails/BookDetails'
import { Home, About, AuthLayout, Login, Register, ConcertsHome, City, Trending, Categories, NotFound, ProtectedRoute, LocationDisplay } from "./components/smallComponents";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="bookform" element={<BookForm/>} />
        <Route path="booktable" element={<BookTable/>} />
        <Route path="details/:id" element={<BookDetails/>} />
        {/* Layout route (no path) for auth related pages */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Route prefixes (route with no element) */}
        <Route path="concerts">
          <Route index element={<ConcertsHome />} />

        {/* Dynamic route segment */}
          <Route path=":city" element={<City />} />
          {/* Static route under the "concerts" prefix */}
          <Route path="trending" element={<Trending />} />
        </Route>
      {/* Optional segments: maintains both /en/categories and /categories. Rather than having two separate routes, we use a single route with an optional parameter */}
      <Route path=":lang?/categories" element={<Categories />} />
      {/* Protected routes */}
      <Route path="secretstuff" element={
        <ProtectedRoute>
          <h1>Super Secret Stuff Only for Authenticated Users!</h1>
        </ProtectedRoute>
      } />
      {/* Display location and query params: */}
      <Route path="location" element={<LocationDisplay />} />
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
    </BrowserRouter>
)
