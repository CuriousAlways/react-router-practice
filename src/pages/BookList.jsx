import { Link } from "react-router-dom";

export default function BookList() {
  return (
    <>
      <h1> This is book List</h1>
      <div>
        <Link to="/books/1" > Book 1 </Link>
        <Link to="/books/2" > Book 2 </Link>
        <Link to="/books/new" > New Book </Link>
      </div>
    </>
  )
}
