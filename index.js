const axios = require('axios');
const express = require('express');
const { URLSearchParams } = require("url");
const app = express();
const path = require("path");

app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: true }));


app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.get('/', (req, res) => {
    res.render("index", { translation: null, error: null });
});

app.post("/translate",async (req,res) => {
const {text} = req.body;
console.log(text)
const encodedParams = new URLSearchParams();
encodedParams.set('source_language', 'en');
encodedParams.set('target_language', 'fr');
encodedParams.set('text',text);

const options = {
  method: 'POST',
  url: 'https://text-translator2.p.rapidapi.com/translate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '1f2b84b774mshd5d06a4fe257264p150915jsn9a9794f715b9',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
  data: encodedParams,
};

try {
    const response = await axios.request(options);
    res.render("index", {
      translation: response.data.data.translatedText,
      error: null,
    });
  } catch (error) {
    res.render("index", { translation: null, error: "Error fetching text" });
  }
});

app.listen(3000, () => {
    console.log("Server started");
});
