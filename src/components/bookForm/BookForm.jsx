import { useState } from 'react'
import { useOutletContext } from 'react-router'
import './bookForm.css'

function BookForm() {
    const {handleAddBook} = useOutletContext();
  

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const rawFormData = new FormData(form)
    const formObject = Object.fromEntries(rawFormData)
    console.log(formObject)
    handleAddBook(formObject);
    form.reset();
    
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

      <button type="submit" className="submit-btn"> Add new Book </button>
    </form>
  )
}

export default BookForm
