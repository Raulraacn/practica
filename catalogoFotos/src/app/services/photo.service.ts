import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Photo} from '../interfaces/Photo'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  url = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient) { }

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(this.url, fd);
  }

  getPhotos() {

    return this.http.get<Photo[]>(this.url);
  }

  getPhoto(id: string) {

    return this.http.get<Photo>(this.url + '/' + id);

  }

  deletePhoto(id: string) {

    return this.http.delete(this.url + '/' + id);

  }

  updatePhoto(id: string, title: string, description: string) {

    return this.http.put(this.url + '/' + id, {title, description});

  }
}