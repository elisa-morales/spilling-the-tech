import generateJoke from "./generateJoke"
import axios from "axios"
import _ from "lodash"
import "./styles/main.scss"

const jokeBtn = document.getElementById("jokeBtn")
jokeBtn.addEventListener("click", generateJoke)

generateJoke()

let count = 0
let newsId = ""

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
  await axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then((res) => {
      const itemData = _.get(res, "data", "")
      renderNews(itemData)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {})
}

function renderNews(data) {
  document.getElementById("prova").innerHTML += `
  <p>${data.by}</p>`
}

fecthAllNews()
