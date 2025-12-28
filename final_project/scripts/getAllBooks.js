const axios = require('axios').default;
const url = "http://localhost:5000"

const getAllBooks = () => {
  const req = axios.get(`${url}/`)
  req.then(resp => {
    let books = resp.data
    console.log(JSON.stringify(books,null,4));
  })
  .catch(err => {
    console.log(err.toString())
  })
}

getAllBooks();