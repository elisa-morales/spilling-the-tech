import axios from "axios"
var get = require("lodash.get")
import "../scss/main.scss"

const API_URL = process.env.API_URL
const API_ID = process.env.API_ID
const loader = document.getElementById("loading")
const loadMoreBtn = document.getElementById("load-more-btn")
const footer = document.getElementById("footer-content")
let count = 0
let newsDay = ""
let newsTime = ""

loadMoreBtn.addEventListener("click", loadMore)

async function fetchAllNews() {
  await axios
    .get(`${API_URL}.json`)
    .then((res) => {
      const newsData = get(res, "data")
      newsData.slice(count, count + 10).forEach(fetchNewsId)

      if (newsData === 0) {
        loadMoreBtn.disabled = true
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

async function fetchNewsId(id) {
  loader.classList.add("display")
  await axios
    .get(`${API_ID}/${id}.json`)
    .then((res) => {
      const itemData = get(res, "data")

      getDate(itemData)
      renderNews(itemData)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loader.classList.remove("display")
      footer.style.visibility = "visible"
      loadMoreBtn.style.visibility = "visible"
    })
}

function getDate(data) {
  const unixTimestamp = data.time
  const date = new Date(unixTimestamp * 1000)
  newsDay = date.toLocaleDateString("default")
  newsTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function loadMore() {
  loadMoreBtn.classList.add("loading-btn")
  count += 10
  fetchAllNews()
  setTimeout(() => {
    loadMoreBtn.classList.remove("loading-btn")
  }, 1000)
}

function renderNews(data) {
  document.getElementById("news-wrapper").innerHTML += `
  <div id="container">
    <h2>${data.title}</h2>
    <p>Posted by ${data.by} | ${newsDay} ⌚ ${newsTime}</p>
    <button id="read-more-btn"><a href="${data.url}" target="_blank">Read the article</a></button>
  </div>
  `
}

fetchAllNews()
