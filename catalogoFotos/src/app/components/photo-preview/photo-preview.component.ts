import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { PhotoService } from '../../services/photo.service'
import {Photo} from '../../interfaces/Photo'

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id: string;
  photo: Photo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.photoService.getPhoto(this.id)
        .subscribe(
          res => {
            this.photo = res;
          },
          err => console.log(err)
        )
    });
  }

  deletePhoto(id: string) {
    //Usamos el servicio creado para borrar la foto
    this.photoService.deletePhoto(id)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/photos']);
      })
  }

  updatePhoto(title: HTMLInputElement, description: HTMLInputElement): boolean {
    //Obtenemos los datos ha actualizar, tittle.value por que es un elemento del html
    this.photoService.updatePhoto(this.photo._id, title.value, description.value)
    //Manejamos la respuesta del servidor
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/photos']);
      });
    return false;
  }

}
