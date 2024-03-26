import { Routes } from '@angular/router';
import { FeaturesComponent } from './components/features/features.component'

export const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    loadChildren: () =>
      import('./components/features/features.module').then(
        (m) => m.FeaturesModule
      ),
  },
  { path: '**', redirectTo: 'auth' }
];
