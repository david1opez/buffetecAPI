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
const createUser_1 = __importDefault(require("./routes/createUser"));
const getUser_1 = __importDefault(require("./routes/getUser"));
const getAttorneys_1 = __importDefault(require("./routes/getAttorneys"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
router.get('/', defaultRoute_1.default);
router.post('/crearUsuario', createUser_1.default);
router.post('/crearAbogado', createUser_1.default);
router.get('/getUsuario', getUser_1.default);
router.get('/getAbogados', getAttorneys_1.default);
app.use('/', router);
// INITIALIZE SERVER
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=index.js.map