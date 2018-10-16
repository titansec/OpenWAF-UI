import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from "@angular/router";
import {PolicyService} from "./policy.service";

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: []
})
export class PolicyComponent implements OnInit {
    public state: any = {
        tabs: {
            demo1: 0,
        }
    };
    constructor(
        private _service: PolicyService,
        private _router: Router,

) {
    }
    ngOnInit() {
    }
}
