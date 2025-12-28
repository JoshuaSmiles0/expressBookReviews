const axios = require('axios').default;
const url = "http://localhost:5000"
const isbn = "xcveosfrfa"


 const getBookByIsbn = (isbn) => {
  const req = axios.get(`${url}/isbn/${isbn}`)
  req.then(resp => {
    console.log(resp.data);
  })
  .catch(err => {
    console.log(err.toString())
  })
}

getBookByIsbn(isbn);