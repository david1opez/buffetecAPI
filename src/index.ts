import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// ROUTES
import DefaultRoute from './routes/defaultRoute';
import CreateUser from './routes/createUser';
import GetUser from './routes/getUser';
import GetAttorneys from './routes/getAttorneys';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

router.get('/', DefaultRoute);

router.post('/crearUsuario', CreateUser);
router.post('/crearAbogado', CreateUser);
router.get('/getUsuario', GetUser);
router.get('/getAbogados', GetAttorneys);

app.use('/', router);

// INITIALIZE SERVER
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});