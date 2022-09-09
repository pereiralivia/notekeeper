require("dotenv").config();
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Server is running on port ${port}`);
});
