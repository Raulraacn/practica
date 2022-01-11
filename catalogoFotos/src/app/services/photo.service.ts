import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Photo} from '../interfaces/Photo'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  //Variable con la direccion de la tabla de la base de datos
  url = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient) { }

  //Metodo para crear una foto con los atributos titulo y descripcion
  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);//Añadimos el titulo
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(this.url, fd);//Retornamos la informacion a la bbdd con el metodo post
  }

  getPhotos() {

    return this.http.get<Photo[]>(this.url);
  }
  //Metodo para ver una foto le pasamos como parametro el id de la foto
  getPhoto(id: string) {

    //Metodo get creado en el backend para que obtenga las imagenes de la base de datos
    return this.http.get<Photo>(this.url + '/' + id);

  }
    //Metodo para borrar una foto le pasamos como parametro el id de la foto

  deletePhoto(id: string) {
    //Metodo delete creado en el backend para que borre la imagen de la base de datos
    return this.http.delete(this.url + '/' + id);

  }
  //Metodo para actualizar una foto le pasamos como parametro el id de la foto
  updatePhoto(id: string, title: string, description: string) {
        //Metodo put creado en el backend para que actualize la imagen de la base de datos

    return this.http.put(this.url + '/' + id, {title, description});

  }
}
