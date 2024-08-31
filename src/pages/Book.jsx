import { useParams } from "react-router-dom"
export default function Book() {
  const {id} = useParams(); // returns route params

  return (
    <p> This is book {id} </p>
  )
}
