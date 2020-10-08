import { Subject } from 'rxjs';
export declare class NgCastService {
    private castSession;
    private cast;
    status: {
        casting: boolean;
    };
    constructor();
    initializeCastApi(): void;
    onInitSuccess: (e: any) => void;
    onError: (err: any) => void;
    discoverDevices: () => Subject<{}>;
    launchMedia: (media: any) => boolean;
    onMediaDiscovered: (how: any, media: any) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    onMediaError: (err: any) => void;
    setCasting(value: any): void;
    getStatus(): {
        casting: boolean;
    };
}
