import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosListComponent } from './components/photos-list/photos-list.component'
import { PhotoFormComponent } from './components/photo-form/photo-form.component'
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component'
import { MainComponentComponent } from './components/main-component/main-component.component';

const routes: Routes = [
  {
    path: 'photos',
    component: PhotosListComponent
  },
  {
    path: 'photos/new',
    component: PhotoFormComponent
  },
  {
    path: 'photos/:id',
    component: PhotoPreviewComponent
  },
  {
    path: '',
    component: MainComponentComponent
    //redirectTo: '/photos',
    //pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
