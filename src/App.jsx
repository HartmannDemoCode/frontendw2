import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const url = 'http://localhost:4000/books'
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBooks(Array.isArray(data) ? data : data.books || [])
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleSubmit2 = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormError('')
    setFormMessage('')

    const form = event.currentTarget
    const rawFormData = new FormData(form)

    const bookPayload = {
      title: String(rawFormData.get('title') || '').trim(),
      author: String(rawFormData.get('author') || '').trim(),
      rating: Number(rawFormData.get('rating')),
      year_published: Number(rawFormData.get('year_published')),
    }

    try {
      const response = await fetch('http://localhost:4000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookPayload),
      })

      if (!response.ok) {
        throw new Error('Could not save book')
      }

      const createdBook = await response.json()
      setBooks((prev) => [createdBook, ...prev])
      form.reset()
      setFormMessage('Book added successfully.')
    } catch (error) {
      setFormError(error.message || 'Something went wrong while adding the book.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className="book-form" onSubmit={handleSubmit2}>
        <h2>Add New Book</h2>
        <div className="book-form-grid">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required />

          <label htmlFor="author">Author</label>
          <input id="author" name="author" type="text" required />

          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.01"
            required
          />

          <label htmlFor="year_published">Year Published</label>
          <input
            id="year_published"
            name="year_published"
            type="number"
            min="1700"
            max="2100"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Book'}
        </button>
        {formError ? <p className="form-error">{formError}</p> : null}
        {formMessage ? <p className="form-message">{formMessage}</p> : null}
      </form>

      <section id="center">
        <h1>Books</h1>
        <div className="table-wrap">
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Rating</th>
                <th>Year Published</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{Number(book.rating).toFixed(2)}</td>
                  <td>{book.year_published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default App
