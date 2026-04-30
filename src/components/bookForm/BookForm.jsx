import { useState } from 'react'
import './bookForm.css'

function BookForm({ onBookAdded }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formMessage, setFormMessage] = useState('')

  const handleSubmit = async (event) => {
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
      form.reset()
      setFormMessage('Book added successfully.')
      onBookAdded(createdBook)
    } catch (error) {
      setFormError(error.message || 'Something went wrong while adding the book.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <div className="book-form-grid">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" placeholder="Enter book title" required />

        <label htmlFor="author">Author</label>
        <input id="author" name="author" type="text" placeholder="Enter author name" required />

        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.01"
          placeholder="0-5"
          required
        />

        <label htmlFor="year_published">Year Published</label>
        <input
          id="year_published"
          name="year_published"
          type="number"
          min="1700"
          max="2100"
          placeholder="YYYY"
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? 'Adding...' : 'Add Book'}
      </button>
      {formError ? <p className="form-error">{formError}</p> : null}
      {formMessage ? <p className="form-message">{formMessage}</p> : null}
    </form>
  )
}

export default BookForm
