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
// User routes
const createUser_1 = __importDefault(require("./routes/user/createUser"));
const getUser_1 = __importDefault(require("./routes/user/getUser"));
const updateUser_1 = __importDefault(require("./routes/user/updateUser"));
const getUsers_1 = __importDefault(require("./routes/user/getUsers"));
// Attorney routes
const createAttorney_1 = __importDefault(require("./routes/attorney/createAttorney"));
const getAttorneys_1 = __importDefault(require("./routes/attorney/getAttorneys"));
const getAttorney_1 = __importDefault(require("./routes/attorney/getAttorney"));
const updateAttorney_1 = __importDefault(require("./routes/attorney/updateAttorney"));
// Client Case routes
const createClientCase_1 = __importDefault(require("./routes/clientCase/createClientCase"));
const getClientCases_1 = __importDefault(require("./routes/clientCase/getClientCases"));
const updateClientCase_1 = __importDefault(require("./routes/clientCase/updateClientCase"));
const getClientsFromSheets_1 = __importDefault(require("./routes/clientCase/getClientsFromSheets"));
// Appointment routes
const createAppointment_1 = __importDefault(require("./routes/appointment/createAppointment"));
const getAppointments_1 = __importDefault(require("./routes/appointment/getAppointments"));
const updateAppointment_1 = __importDefault(require("./routes/appointment/updateAppointment"));
const cancelAppointment_1 = __importDefault(require("./routes/appointment/cancelAppointment"));
const deleteAppointment_1 = __importDefault(require("./routes/appointment/deleteAppointment"));
// News routes
const getNews_1 = __importDefault(require("./routes/news/getNews"));
const createNews_1 = __importDefault(require("./routes/news/createNews"));
const deleteNews_1 = __importDefault(require("./routes/news/deleteNews"));
const updateNews_1 = __importDefault(require("./routes/news/updateNews"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
router.get("/", defaultRoute_1.default);
// User routes
router.post("/createUser", createUser_1.default);
router.get("/getUser", getUser_1.default);
router.get("/getUsers", getUsers_1.default);
router.put("/updateUser", updateUser_1.default);
// Attorney routes
router.post("/createAttorney", createAttorney_1.default);
router.get("/getAttorneys", getAttorneys_1.default);
router.get("/getAttorney", getAttorney_1.default);
router.put("/updateAttorney", updateAttorney_1.default);
// Client Case routes
router.post("/createClientCase", createClientCase_1.default);
router.get("/getClientCases", getClientCases_1.default);
router.put("/updateClientCase", updateClientCase_1.default);
router.get("/getClientsFromSheets", getClientsFromSheets_1.default);
// Appointment routes
router.post("/createAppointment", createAppointment_1.default);
router.get("/getAppointments", getAppointments_1.default);
router.put("/updateAppointment", updateAppointment_1.default);
router.put("/cancelAppointment", cancelAppointment_1.default);
router.delete("/deleteAppointment", deleteAppointment_1.default);
// News routes
router.get("/getNoticias", getNews_1.default);
router.post("/crearNoticia", createNews_1.default);
router.post("/eliminarNoticia", deleteNews_1.default);
router.put("/actualizarNoticia", updateNews_1.default);
app.use("/", router);
// INITIALIZE SERVER
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
//# sourceMappingURL=index.js.map