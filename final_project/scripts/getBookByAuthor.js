const axios = require('axios').default;
const url = "http://localhost:5000"
const author = "Dante Alighieri"

const getBooksByAuthor = (a) => {
  const req = axios.get(`${url}/author/${author}`)
  req.then(resp => {
    console.log(resp.data);
  })
  .catch(err => {
    console.log(err.toString())
  })
}

getBooksByAuthor(author);



