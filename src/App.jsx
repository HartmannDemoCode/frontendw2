import { useEffect, useState } from "react";
import "./App.css";
import BookForm from "./components/bookForm/BookForm";
import BookTable from "./components/bookTable/BookTable";
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
    // TODO: Implement a Details component to show all details
  };

  const handleEdit = (book) => {
    console.log("Edit book:", book);
    // TODO: Implement edit functionality
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
      {/* <Header/> */}
      <h1>APP</h1>
      <Outlet context={{handleAddBook, books, handleDetails, handleEdit, handleDelete}}/>
    </>
  );
}

export default App;
