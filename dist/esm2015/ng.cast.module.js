import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCastComponent } from './ng-cast.component';
import { NgCastService } from './shared/ng-cast.service';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgStreamingModule } from 'videogular2/compiled/streaming';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
export class NgCastModule {
}
NgCastModule.decorators = [
    { type: NgModule, args: [{
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [
                    CommonModule,
                    VgCoreModule,
                    VgControlsModule,
                    VgStreamingModule,
                    VgBufferingModule,
                    VgOverlayPlayModule,
                ],
                exports: [NgCastComponent],
                providers: [NgCastService],
                declarations: [NgCastComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuY2FzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdGhpbmtlci9kZXYvdGhpbmthbS9uZ0Nhc3QvIiwic291cmNlcyI6WyJuZy5jYXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQWdCeEUsTUFBTSxPQUFPLFlBQVk7OztZQWR4QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsc0JBQXNCLENBQUU7Z0JBQ25DLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ0Nhc3RDb21wb25lbnQgfSBmcm9tICcuL25nLWNhc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE5nQ2FzdFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9uZy1jYXN0LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBWZ0NvcmVNb2R1bGUgfSBmcm9tICd2aWRlb2d1bGFyMi9jb21waWxlZC9jb3JlJztcbmltcG9ydCB7IFZnQ29udHJvbHNNb2R1bGUgfSBmcm9tICd2aWRlb2d1bGFyMi9jb21waWxlZC9jb250cm9scyc7XG5pbXBvcnQgeyBWZ1N0cmVhbWluZ01vZHVsZSB9IGZyb20gJ3ZpZGVvZ3VsYXIyL2NvbXBpbGVkL3N0cmVhbWluZyc7XG5pbXBvcnQgeyBWZ0J1ZmZlcmluZ01vZHVsZSB9IGZyb20gJ3ZpZGVvZ3VsYXIyL2NvbXBpbGVkL2J1ZmZlcmluZyc7XG5pbXBvcnQgeyBWZ092ZXJsYXlQbGF5TW9kdWxlIH0gZnJvbSAndmlkZW9ndWxhcjIvY29tcGlsZWQvb3ZlcmxheS1wbGF5JztcblxuQE5nTW9kdWxlKHtcbiAgc2NoZW1hczogWyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVmdDb3JlTW9kdWxlLFxuICAgIFZnQ29udHJvbHNNb2R1bGUsXG4gICAgVmdTdHJlYW1pbmdNb2R1bGUsXG4gICAgVmdCdWZmZXJpbmdNb2R1bGUsXG4gICAgVmdPdmVybGF5UGxheU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW05nQ2FzdENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW05nQ2FzdFNlcnZpY2VdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ0Nhc3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nQ2FzdE1vZHVsZSB7IH1cbiJdfQ==