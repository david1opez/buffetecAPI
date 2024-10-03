"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// ROUTES
const defaultRoute_1 = __importDefault(require("./routes/defaultRoute"));
const createUser_1 = __importDefault(require("./routes/user/createUser"));
const getUser_1 = __importDefault(require("./routes/user/getUser"));
const updateUser_1 = __importDefault(require("./routes/user/updateUser"));
const getAttorneys_1 = __importDefault(require("./routes/attorney/getAttorneys"));
const getNews_1 = __importDefault(require("./routes/news/getNews"));
const createNews_1 = __importDefault(require("./routes/news/createNews"));
// import admin from "firebase-admin";
// const serviceAccount = require("./creds.json");
const app = (0, express_1.default)();
const router = express_1.default.Router();
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
router.get("/", defaultRoute_1.default);
// Rutas de usuario
router.post("/crearUsuario", createUser_1.default);
router.put("/editarUsuario", updateUser_1.default);
router.get("/getUsuario", getUser_1.default);
// Rutas de abogado
router.post("/crearAbogado", createUser_1.default);
router.get("/getAbogados", getAttorneys_1.default);
// Rutas de Noticias
router.get("/getNoticias", getNews_1.default);
router.post("/crearNoticia", createNews_1.default);
app.use("/", router);
// INITIALIZE SERVER
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map