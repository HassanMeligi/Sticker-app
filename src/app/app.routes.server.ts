import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'create', renderMode: RenderMode.Prerender },
  { path: 'create/:id', renderMode: RenderMode.Server },  // Server = hydrate at runtime
  { path: '**', renderMode: RenderMode.Server }           // Optional fallback
];
