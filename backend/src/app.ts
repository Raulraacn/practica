import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import indexRoutes from './routes/index'

// Inicializamos
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', indexRoutes);

//La carpeta uploads se utilizara para almacenar imágenes de archivos públicos
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;