import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import BookForm from './components/bookForm/BookForm.jsx'
import BookTable from './components/bookTable/BookTable.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="bookform" element={<BookForm/>} />
        <Route path="booktable" element={<BookTable/>} />
      </Route>
    </Routes>
    </BrowserRouter>
)
