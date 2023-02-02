const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");

const storeItemsApiRoutes = require("./routes/api/items");
const authApiRoutes = require("./routes/api/auth");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;
const db =
  "mongodb+srv://AnyUser:anyuser123@cluster0.tormg0s.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to DB"))
  .catch((err) => console.log("Ошибка при подключении к БД", err));

app.listen(PORT, "localhost", (err) => {
  err
    ? console.log("Ошибка при запуске сервера", err)
    : console.log(`Listen port ${PORT}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   // res.setHeader("Content-Type", "application/json");
//   // res.setHeader("Access-Control-Allow-Origin", "*");
//   // res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
//   // res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(storeItemsApiRoutes);
app.use(authApiRoutes);

// Middleware для парсинга входящего запроса
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
