import { Link, Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import BookList from "./pages/BookList"
import NotFound from "./pages/NotFound"
import Book from "./pages/Book"
import NewBook from "./pages/NewBook"
import BooksLayout from "./layouts/BooksLayout"
import BookRoutes from "./BookRoutes"

function App() {

  const location = useLocation();
  console.log(location);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" state={{firstName: 'raza', lastName: 'khan'}}> Home </Link>
          </li>
          <li>
            <Link to="/about"> About </Link>
          </li>
          <li>
            <Link to="/books"> Books </Link>
          </li>
        </ul>
      </nav>

      <p>{JSON.stringify(location.state)}</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books/*" element={<BookRoutes />} />
        {/* <Route path="/books" element={<BooksLayout />}>
          <Route index element={<BookList />} />
          <Route path=":id" element={<Book />} />
          <Route path="new" element={<NewBook />} />
        </Route> */}
        {/* <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/new" element={<NewBook />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
