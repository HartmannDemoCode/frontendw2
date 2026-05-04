import { useEffect, useState } from "react";
import "./App.css";
import BookForm from "./components/bookForm/BookForm";
import BookTable from "./components/bookTable/BookTable";
import Header from "./components/header/Header";
import apiFacade from "./services/bookApiFacade";
import { Outlet } from "react-router";

function App() {
  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   apiFacade.getAllBooks().then((data) => {
  //     console.log(data);
  //   }).catch;
  // }, []);

  useEffect(() => {
    (async () => {
      const booksFromServer = await apiFacade.getAllBooks();
      setBooks(booksFromServer);
    })();
  }, []);

  const handleAddBook = async (newBook) => {
    const createdBook = await apiFacade.createBook(newBook);
    console.log(createdBook);
    setBooks((prevBooks)=>[...prevBooks, createdBook]);
  };

  const handleDetails = (book) => {
    (async () => {
      try {
        const bookDetails = await apiFacade.getBook(book.id);
        alert(
          `Title: ${bookDetails.title}\nAuthor: ${bookDetails.author}\nRating: ${bookDetails.rating}\nYear Published: ${bookDetails.year_published}\nImage URL: ${bookDetails.image_url || "N/A"}`
        );
      } catch (error) {
        alert("Could not load book details.");
      }
    })();
  };

  const handleEdit = async (book) => {
    const updatedBook = await apiFacade.updateBook(book.id, {
      ...book,
      title,
    });
    setBooks((prevBooks) =>
      prevBooks.map((currentBook) =>
        currentBook.id === book.id ? updatedBook : currentBook
      )
    );
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
    const deletedBook = await apiFacade.deleteBook(bookId);
    setBooks((prevBooks)=>prevBooks.filter(book=>book.id !== bookId));
  };

  return (
    <>
      {/* <BookForm handleAddBook={handleAddBook} />
      <BookTable
        books={books}
        onDetails={handleDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
      <Header />
      <Outlet context={{handleAddBook, books, handleDetails, handleEdit, handleDelete}}/>
    </>
  );
}

export default App;
