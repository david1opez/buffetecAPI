import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// ROUTES
import DefaultRoute from "./routes/defaultRoute";

import CreateUser from "./routes/user/createUser";
import GetUser from "./routes/user/getUser";
import UpdateUser from "./routes/user/updateUser";

import GetAttorneys from "./routes/attorney/getAttorneys";
// import admin from "firebase-admin";

// const serviceAccount = require("./creds.json");
const app = express();
const router = express.Router();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

app.use(cors());
app.use(bodyParser.json());

router.get("/", DefaultRoute);

// Rutas de usuario
router.post("/crearUsuario", CreateUser);
router.put("/editarUsuario", UpdateUser);
router.get("/getUsuario", GetUser);

router.post("/crearAbogado", CreateUser);
router.get("/getAbogados", GetAttorneys);

app.use("/", router);

// INITIALIZE SERVER
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
