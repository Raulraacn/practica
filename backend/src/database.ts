import { connect } from 'mongoose'

export async function startConnection() {
    const db = await connect('mongodb://localhost/catalogo',{
        //useNewUrlParser: true,
        //useFindAndModify: false 
    });
    console.log('Base de datos conectada');
}
