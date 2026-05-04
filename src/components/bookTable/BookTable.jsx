import { useOutletContext, Link } from 'react-router'
import './bookTable.css'

function BookTable() {
  const {books, handleDetails, handleEdit, handleDelete} = useOutletContext();
  return (
    <section className="books-section">
      <h1>Books</h1>
      <div className="table-wrap">
        {books.length > 0 ? (
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Rating</th>
                <th>Year Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="title-cell">{book.title}</td>
                  <td>{book.author}</td>
                  <td className="rating-cell">
                    <span className="rating-badge">{Number(book.rating).toFixed(2)}</span>
                  </td>
                  <td>{book.year_published}</td>
                  <td className="actions-cell">
                    <Link to={`/details/${book.id}`} className="action-btn details-btn" title="View details">
                      Details
                    </Link>
                    <button className="action-btn edit-btn" onClick={() => handleEdit && handleEdit(book)} title="Edit book">
                      Edit
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete && handleDelete(book.id)} title="Delete book">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No books yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BookTable
