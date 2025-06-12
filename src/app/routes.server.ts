import { provideRoutes } from '@angular/router';
import { routes } from './app.routes';

export const serverRoutes = provideRoutes([
  ...routes.filter(r => r.path !== 'create/:id')
]);
