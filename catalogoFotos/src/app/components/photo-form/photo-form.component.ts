import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {PhotoService} from '../../services/photo.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoSelected: string | ArrayBuffer;
  file: File;

  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit() {
  }

  //Metodo para coger la foto seleccionada al hacer click se pasa un HtmlInputEvent
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  //Metodo para actualizar la foto, se pasan como parametros el input y el textArea del html
  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    this.photoService
    //Metodo createPhoto de Services photoService para coger los valores y despues mandarlos a la base de datos
      .createPhoto(title.value, description.value, this.file)
      .subscribe(
        res => {
          console.log(res);
          //Mostramos con window.alert() alert para que el usuario sepa que se ha subido la foto con éxito
          window.alert('Foto subida')
          this.router.navigate(['/photos'])
        },
        err => console.log(err)
      );
    return false;
  }

}
