import { Component } from '@angular/core';
import { EventBusService } from './shared/eventBus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-memenow';

  eventBusSub?: Subscription;

  constructor(private eventBus: EventBusService) {

  }

  ngOnInit() {
    this.eventBusSub = this.eventBus.on("logout", () => console.log("LOGOUT"))
    console.log("En este instante el componente ha cargado AppComponent");
  }
}
