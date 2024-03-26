import { Routes } from '@angular/router';
import { FeaturesComponent } from './components/features/features.component'

export const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent
  },
  { path: '**', redirectTo: 'auth' }
];
