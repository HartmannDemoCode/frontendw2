import { Link, useOutletContext, useParams } from 'react-router'

function BookDetails() {
  const { id } = useParams()
  const { books } = useOutletContext()
  const book = books.find((item) => String(item.id) === String(id))

  if (!book) {
    return (
      <section>
        <h2>Book not found</h2>
        <Link to="/booktable">Back to Book Table</Link>
      </section>
    )
  }

  return (
    <section>
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Rating:</strong> {book.rating}</p>
      <p><strong>Year Published:</strong> {book.year_published}</p>
      <p><strong>Image URL:</strong> {book.image_url || 'N/A'}</p>
      <Link to="/booktable">Back to Book Table</Link>
    </section>
  )
}

export default BookDetails
