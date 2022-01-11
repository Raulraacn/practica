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
  //Variables
  id: string;
  photo: Photo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit() {
    //ActivatedRoute para obtener la ruta seleccionada y Router para redireccionar a otro lugar de la app
    this.activatedRoute.params.subscribe(params => {
      //Guardamos el id de la url
      this.id = params['id'];
      //Utilizamos el servicio de PhotoService getPhoto() para que nos muestre la foto a traves del id
      this.photoService.getPhoto(this.id)
        .subscribe(//Metodo subscribe retorna la respuesta y el error si lo hubiera
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
        //Mostramos con window.alert() alert para que el usuario sepa que se ha borrado la foto con éxito
        window.alert('Foto eliminada')
        this.router.navigate(['/photos']);
      })
  }

  updatePhoto(title: HTMLInputElement, description: HTMLInputElement): boolean {
    //Obtenemos los datos ha actualizar, tittle.value por que es un elemento del html
    this.photoService.updatePhoto(this.photo._id, title.value, description.value)
    //Manejamos la respuesta del servidor
      .subscribe(res => {
        console.log(res);
        //Mostramos con window.alert() para que el usuario sepa que se ha actualiazdo la foto con éxito
        window.alert('Foto actualizada')
        //Redireccionas a la ventana photos si se añade correctamente
        this.router.navigate(['/photos']);
      });
    return false;
  }

}
