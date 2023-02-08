const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("bcb14b1547e44237ac568744e7a1c807");

async function news() {
  let result;
  let array = [];
  await newsapi.v2
    .everything({
      q: "renewables",
      language: "en",
    })
    .then((response) => {
      result = JSON.stringify(response.articles);
    });
  return result;
}

module.exports = { news };


// new api works! pretty cool