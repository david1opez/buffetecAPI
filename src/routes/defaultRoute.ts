import Routes from "./Routes";

import { Request, Response } from "express";

export default async function DefaultRoute(req: Request, res: Response) {
  const { route } = req.query as { route: string };

  if (!route) {
    return res.status(200).send({
      message:
        "Para obtener información de una ruta, debes enviar el nombre de la ruta como query parameter 'route'",
      example: "https:url.com/?route=nombreDeLaRuta",
      routes: Routes.routes.map((r) => r.route.replace("/", "")),
    });
  } else {
    const routeData = Routes.routes.find(
      (r) => r.route.replace("/", "") === route
    );

    if (routeData) {
      return res.status(200).send(routeData);
    } else {
      return res.status(404).send("Route not found");
    }
  }
}
