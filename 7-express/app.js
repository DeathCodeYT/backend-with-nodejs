import express from "express";

const server = express();

server
  .route("/contact")
  .get((req, res) => {
    res.send("Hello");
  })
  .post((req, res) => {
    res.send(["Death","CODE"]);
  })

server.get("/about", (req, res) => {
  const { name, username_YT } = req.query;
  res.send("This is ABOUT," + " " + name + " " + username_YT);
});

const PORT = process.env.PORT | 4000;
server.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});
