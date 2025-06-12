import { provideRoutes } from '@angular/router';
import { StickerCreateComponent } from './app/components/sticker-create/sticker-create.component';
import { StickerListComponent } from './app/components/sticker-list/sticker-list.component';

export const routes = provideRoutes([
  { path: '', component: StickerListComponent },
  { path: 'create', component: StickerCreateComponent },
  {
    path: 'create/:id',
    component: StickerCreateComponent,
    getPrerenderParams: async () => {
      // Fetch IDs from your API or define manually
      const ids = [1, 2, 3];
      return ids.map(id => ({ id: id.toString() }));
    }
  }
]);
