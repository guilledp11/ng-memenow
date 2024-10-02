import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "timeline",
    templateUrl: "timeline.component.html"
})
export class TimelineComponent {

    constructor( activeRoute: ActivatedRoute) {
        activeRoute.params.subscribe(params => {
            console.log(params);
        });
    }

    ngOnInit() {
        console.log("En este instante el componente ha cargado TimelineComponent");
    }

}