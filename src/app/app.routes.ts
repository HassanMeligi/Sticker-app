import { Routes } from '@angular/router';
import { StickerListComponent } from './components/sticker-list/sticker-list.component';
import { StickerCreateComponent } from './components/sticker-create/sticker-create.component';

export const routes: Routes = [
  { path: '', component: StickerListComponent },
  { path: 'create', component: StickerCreateComponent },
  { path: 'create/:id', component: StickerCreateComponent }  // Dynamic route
];
