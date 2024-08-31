# React Router
## Basic Routing Setup
- wrap whole app in `BrowserRouter` context
- specify routes and corresponding component to render

```jsx
// main.jsx
...
return (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
)

// app.jsx
....
return(
  <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/new" element={<NewBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </>
)
```

### Nesting Routes and providing layout

```jsx
// app.jsx
....
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/books" element={<BooksLayout />}> // here this layout would be rendered for all matching routes
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>

// BooksLayout.jsx
....
<>
  ... some layout specific stuff
  <Outlet /> // this renders specific route content
</>
```

- Refactor our code we can define route for parent separately. Here in above example we also specify routes as:
```jsx
// app.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/books/*" element={<BookRoutes />} />
  <Route path="*" element={<NotFound />} />
</Routes>

// BookRoutes.jsx
<Routes>
  <Route element={<BooksLayout />}> // here this layout would be rendered for all matching routes
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
<Routes>
```


## Multiple routes
- We can have multiple routes which could specify which component should render
```jsx
// app.jsx
... Some stuff....
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/books/*" element={<BookRoutes />} />
  <Route path="*" element={<NotFound />} />
</Routes>
... Some more Stuff ...
...
<Routes>
  <Route path="/" element={<HomeFooter />} />
  <Route path="/about" element={<AboutFooter />} />
<Routes>
```

## Accessing routes parameteres
- We access routes params using `useParams` hook

```jsx
//Book.jsx
import { useParams } from 'react-dom-router'

export default function Book() {
  const params = useParams();
  // considering above routing structure
  // if we visit /books/2
  // params -> { id: "2" }

  return (
    <>
      ....
    </>
  )
}
```

### Link / NavLink
- These are similar to `<a> </a>` tag which help us move across pages.
- like `<a>` it changes browser history and url
- unlike `<a>` tag it only renders parts of page that needs rerendering instead of reloading the whole page

```jsx
....
<Link to="/books"> Books </Link>
<Link to="/books/new" replace> New Book </Link> // replaces current page in history with this page
<Link to="/books/2" reloadDocument> New Book </Link> // instead of replacing specific part of page (what matches route) it reload entire page
<Link to="/home" state={{firstName: 'raza', lastName: 'khan'}}> Home </Link> // allows us to pass data without changing route
```

### `NavLink` has all the property of `Link` but it also provide some additional property to manage active state of link
```jsx
// conditionally attach a class name when current page is same as specified in to params
// by default it attaches `active` class on active nav link
<NavLink to="/books" className={(isActive) => (isActive ? 'link-active' : '') }> Books </NavLink>

// conditionally attach style when current page is same as specified in to params
<NavLink to="/books" styles={(isActive) => (isActive ? {color: 'red' } : {}) }> Books </NavLink>

// conditionally render child when current page is same as specified in to params
<NavLink to="/books">
  (isActive) => {
    if(isActive) {
      return 'Active Book Link';
    }
    else {
      return 'Book';
    }
  }
</NavLink>
```


# Navigate/useNavigate
- `Navigate` component redirects user to page.

```jsx
//NotFound.jsx
export default function NotFound() {
  return <Navigate to="/">
}
```

- In functional component we can use `useNavigate` hook to redirect user.


```jsx
//NotFound.jsx
export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    /* we can specify:
    *   - specific path
    *   - -ve number to go that many page back
    * additional we can send `state` send data back
    * */
    navigate('/', { state: 'Error!!! page not found' });
  })

  return <> Not Found </>
}
```

# useSearchParams
- To access and update search params we can `useSearchParams` hook.

```jsx
// app.jsx
....
const [searchParams, setSearchParams] = useSearchParams({book_name: 'life with uncle ken'});// we can pass default param

// read search params
console.log(searchParams.get('book_name'));

// update search params
setSearchParams({book_name: '1984'})
```

# useLocation
- we can access state, whole search query and pathname with `useLocation` hook
- we can pass state across pages/component using `state` prop on `Link`, `NavLink` component or `useNavigate`  hook.

```jsx
// app.jsx
const location = useLocation();

// access state
console.log(location.state);

// pass state via Link, NavLink or useNavigate hook
<NavLink state={{a: 1}} to="/"> Home </NavLink>
<Link state="raza" to="/books"> Books </Link>
```
