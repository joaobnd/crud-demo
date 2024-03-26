import { Component } from '@angular/core';

import { ContactListComponent } from './contact-list/contact-list.component'

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [ContactListComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  title = 'Lista telefônica'

}
