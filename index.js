const http = require("http");
const appFile = require("./app.js");

const hostname = "127.0.0.1";
const port = 3000;

const express = require("express");
const app = express();

const server = http.createServer(app);

app.use(express.static("public"));

// Create a front page ('/') that tells about your music artist. Include a couple of pictures
app.get("/", (req, res) => {
  let homePage = `      <h1>Lil Wayne</h1>
  <p> Dwayne Michael Carter Jr., known professionally as Lil Wayne, is an American rapper, singer, </br> 
  songwriter and record executive. He is commonly regarded as one of the most influential hip hop  </br>
  artists of his generatnpion, and often cited as one of the greatest rappers of all time</p>
  <a href="/cds">List of cds</a></br>
  <img src='/images/lilwayne1.jpg'      width="200" 
     height="200">
    <img src='/images/lilwayne2.jpg'      width="200" 
     height="200">
     <img src='/images/lilwayne3.jpg'      width="200" 
     height="200">`;
  res.send(homePage);
});

// Create a page that lists all of the cds for the artist.
app.get("/cds", (req, res) => {
  //Each CD should be a hyperlink that navigates to a page that corresponds to the index in the json file
  let albumList = ``;
  albumList += "";
  for (let cd of appFile) {
    albumList += `
              <a href=/cd/${appFile.indexOf(cd)}>${cd.name}</a>
              <p>${cd.publishDate}</p>
              <ul>
          `;
    for (let song of cd.songTitles) {
      albumList += `
                  <li>${song}</li>
              `;
    }
    albumList += "</ul>";
  }
  res.send(albumList);
});

// Create a route that takes in arguments on the url that will display one artist/place/music at a time.
app.get("/cd/:cdIndex", (req, res) => {
  const { cdIndex } = req.params;
  const cd = appFile[cdIndex];
  let albumInfo = ``;
  albumInfo += `<h1>${cd.name}</h1>`;
  albumInfo += `<h2>${cd.publishDate}</h2>`;
  albumInfo += `<h3>${cd.imgURL}</h3>`;
  albumInfo += "<ul>";
  for (song of cd.songTitles) {
    albumInfo += `<li>${song}</li>`;
  }
  albumInfo += "</ul>";
  res.send(albumInfo);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
