import axios from "axios"
import _ from "lodash"
import "./styles/main.scss"

let count = 0
let newsId = ""
const loader = document.getElementById("loading")

async function fecthAllNews() {
  await axios
    .get("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then((res) => {
      const newsData = _.get(res, "data", "")
      newsId = newsData.slice(count, count + 10).forEach(fetchNewsId)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {})
}

async function fetchNewsId(id) {
  loader.classList.add("display")
  await axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then((res) => {
      const itemData = _.get(res, "data", "")
      renderNews(itemData)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loader.classList.remove("display")
    })
}

function renderNews(data) {
  document.getElementById("news-wrapper").innerHTML += `
  <div id="container">
          <h2>${data.title}</h2>
          <p>Posted by ${data.by} | ${data.time}</p>
          <button><a href="${data.url}" target="_blank">Read more</a></button>
        </div>`
}

fecthAllNews()
