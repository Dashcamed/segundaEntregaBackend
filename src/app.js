import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(8080, () =>
  console.log(`Listening on port 8080`)
);

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

const products = [];
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("product", (data) => {
    console.log(data);
    products.push(data);
    io.emit("product", products);
  });
});
