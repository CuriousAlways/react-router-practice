import { Link, Outlet, useSearchParams } from "react-router-dom";

export default function BooksLayout() {
  const [searchParams, setSearchParams] = useSearchParams({n: '1'});
  console.log(searchParams)

  return (
    <>
      <div>
        <Link to="/books/1" > Book 1 </Link><br />
        <Link to="/books/2" > Book 2 </Link><br />
        <Link to={`/books/${searchParams.get('n')}`} > Book {searchParams.get('n')} </Link><br />
        <Link to="/books/new" > New Book </Link>
      </div>
      <input name="number" type="number" value={searchParams.get('n')} onChange={(e) => setSearchParams({n: e.target.value})} />
      <Outlet />
    </>
  )
}
