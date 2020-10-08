import { Subject } from 'rxjs';
export declare class NgCastService {
    private cast;
    private session;
    private currentMedia;
    status: {
        casting: boolean;
    };
    constructor();
    initializeCastApi(): void;
    onGCastApiAvailable(url: string, type: string): void;
    onInitSuccess: () => void;
    onError: (err: any) => void;
    discoverDevices: () => Subject<unknown>;
    launchMedia: (media: any) => boolean;
    onMediaDiscovered: (media: any) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    onMediaError: (err: any) => void;
    setCasting(value: any): void;
    getStatus(): {
        casting: boolean;
    };
}
