const API_BASE_URL = 'http://localhost:4000'
const bookApiFacade = {
  async getAllBooks() {
    try {
      const response = await fetch(`${API_BASE_URL}/books`)
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      const data = await response.json()
      return Array.isArray(data) ? data : data.books || []
    } catch (error) {
      console.error('Error fetching books:', error)
      throw error
    }
  },

  async getBook(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch book')
      }
      return await response.json()
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error)
      throw error
    }
  },

  async createBook(bookData) {
    try {
      const payload = {
        title: String(bookData.title || '').trim(),
        author: String(bookData.author || '').trim(),
        rating: Number(bookData.rating),
        year_published: Number(bookData.year_published),
      }

      if (bookData.image_url) {
        payload.image_url = bookData.image_url
      }

      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to create book')
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating book:', error)
      throw error
    }
  },

  async updateBook(id, bookData) {
    try {
      const payload = {
        title: String(bookData.title || '').trim(),
        author: String(bookData.author || '').trim(),
        rating: Number(bookData.rating),
        year_published: Number(bookData.year_published),
      }
      if (bookData.image_url !== undefined) payload.image_url = bookData.image_url

      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to update book')
      }

      return await response.json()
    } catch (error) {
      console.error(`Error updating book ${id}:`, error)
      throw error
    }
  },

  async deleteBook(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete book')
      }
    } catch (error) {
      console.error(`Error deleting book ${id}:`, error)
      throw error
    }
  },
}

export default bookApiFacade
