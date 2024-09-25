"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("./Routes"));
async function DefaultRoute(req, res) {
    const { route } = req.query;
    if (!route) {
        return res.status(200).send({
            message: "Para obtener información de una ruta, debes enviar el nombre de la ruta como query parameter 'route'",
            example: "https:url.com/?route=nombreDeLaRuta",
            routes: Routes_1.default.routes.map(r => r.route.replace('/', '')),
        });
    }
    else {
        const routeData = Routes_1.default.routes.find(r => r.route.replace('/', '') === route);
        if (routeData) {
            return res.status(200).send(routeData);
        }
        else {
            return res.status(404).send('Route not found');
        }
    }
}
exports.default = DefaultRoute;
//# sourceMappingURL=defaultRoute.js.map