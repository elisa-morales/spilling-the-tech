import axios from "axios"
import _ from "lodash"
import "./styles/main.scss"

let count = 0
let newsId = ""
let newsDate = ""
let newsTime = ""
const loader = document.getElementById("loading")
const loadMoreBtn = document.getElementById("load-more-btn")
const footer = document.getElementById("footer-content")

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
      getDate(itemData)
      renderNews(itemData)
      footer.style.visibility = "visible"
      loadMoreBtn.style.visibility = "visible"
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loader.classList.remove("display")
    })
}

function getDate(data) {
  const unixTimestamp = data.time
  const date = new Date(unixTimestamp * 1000)
  newsDate = date.toLocaleDateString("default")
  newsTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function renderNews(data) {
  document.getElementById("news-wrapper").innerHTML += `
  <div id="container">
          <h2>${data.title}</h2>
          <p>Posted by ${data.by} | ⌚ ${(newsDate, newsTime)}</p>
          <button><a href="${data.url}" target="_blank">Read article</a></button>
        </div>`
}

fecthAllNews()
