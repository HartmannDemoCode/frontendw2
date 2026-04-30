import { useEffect, useState } from 'react'
import './App.css'
import BookForm from './components/bookForm/BookForm'
import BookTable from './components/bookTable/BookTable'
import apiFacade from './services/bookApiFacade'

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    // TODO: Implement functionality to handle getting books using the apiFacade
  }, [])

  const handleAddBook = (newBook) => {
    // TODO: Implement functionality to handle adding a book
  }

  const handleDetails = (book) => {
    // TODO: Implement a Details component to show all details
  }

  const handleEdit = (book) => {
    console.log('Edit book:', book)
    // TODO: Implement edit functionality
  }

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return
    }
    // TODO: Implement delete functionality
  }

  return (
    <>
      <BookForm onBookAdded={handleAddBook} />
      <BookTable books={books} onDetails={handleDetails} onEdit={handleEdit} onDelete={handleDelete} />
      // TODO: Implement functionality to show a component with the detail (and image) of the selected book
    </>
  )
}

export default App
