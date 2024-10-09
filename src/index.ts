import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// ROUTES
import DefaultRoute from "./routes/defaultRoute";

// User routes
import CreateUser from "./routes/user/createUser";
import GetUser from "./routes/user/getUser";
import UpdateUser from "./routes/user/updateUser";
import GetUsers from "./routes/user/getUsers";

// Attorney routes
import CreateAttorney from "./routes/attorney/createAttorney";
import GetAttorneys from "./routes/attorney/getAttorneys";
import GetAttorney from "./routes/attorney/getAttorney";
import UpdateAttorney from "./routes/attorney/updateAttorney";

// Client Case routes
import CreateClientCase from "./routes/clientCase/createClientCase";
import GetClientCases from "./routes/clientCase/getClientCases";
import UpdateClientCase from "./routes/clientCase/updateClientCase";
import GetClientsFromSheets from "./routes/clientCase/getClientsFromSheets";

// Appointment routes
import CreateAppointment from "./routes/appointment/createAppointment";
import GetAppointments from "./routes/appointment/getAppointments";
import UpdateAppointment from "./routes/appointment/updateAppointment";
import CancelAppointment from "./routes/appointment/cancelAppointment";
import DeleteAppointment from "./routes/appointment/deleteAppointment";

// News routes
import GetNews from "./routes/news/getNews";
import CreateNews from "./routes/news/createNews";
import DeleteNews from "./routes/news/deleteNews";

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

router.get("/", DefaultRoute);

// User routes
router.post("/createUser", CreateUser);
router.get("/getUser", GetUser);
router.get("/getUsers", GetUsers);
router.put("/updateUser", UpdateUser);

// Attorney routes
router.post("/createAttorney", CreateAttorney);
router.get("/getAttorneys", GetAttorneys);
router.get("/getAttorney", GetAttorney);
router.put("/updateAttorney", UpdateAttorney);

// Client Case routes
router.post("/createClientCase", CreateClientCase);
router.get("/getClientCases", GetClientCases);
router.put("/updateClientCase", UpdateClientCase);
router.get("/getClientsFromSheets", GetClientsFromSheets);

// Appointment routes
router.post("/createAppointment", CreateAppointment);
router.get("/getAppointments", GetAppointments);
router.put("/updateAppointment", UpdateAppointment);
router.put("/cancelAppointment", CancelAppointment);
router.delete("/deleteAppointment", DeleteAppointment);

// News routes
router.get("/getNoticias", GetNews);
router.post("/crearNoticia", CreateNews);
router.post("/eliminarNoticia", DeleteNews);

app.use("/", router);

// INITIALIZE SERVER
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
