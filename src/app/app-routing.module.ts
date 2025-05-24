import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerListComponent } from './components/sticker-list/sticker-list.component';
import { StickerCreateComponent } from './components/sticker-create/sticker-create.component';

const routes: Routes = [
  { path: '', component: StickerListComponent },
  { path: 'create', component: StickerCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
