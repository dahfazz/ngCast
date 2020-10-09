import { OnInit } from '@angular/core';
import { NgCastService } from './shared/ng-cast.service';
export declare class NgCastComponent implements OnInit {
    private ngCastService;
    castingStatus: any;
    window: any;
    constructor(ngCastService: NgCastService);
    ngOnInit(): void;
    openSession(): void;
    closeSession(): void;
}
