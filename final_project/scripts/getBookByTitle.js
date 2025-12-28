const axios = require('axios').default;
const url = "http://localhost:5000"
const title = "Molloy, Malone Dies, The Unnamable, the trilogy"

const getBookByTitle = (title) => {
  const req = axios.get(`${url}/title/${title}`)
  req.then(resp => {
    console.log(resp.data);
  })
  .catch(err => {
    console.log(err.toString())
  })
}

getBookByTitle(title)