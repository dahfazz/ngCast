import { Subject } from 'rxjs';
export declare class NgCastService {
    private cast;
    private chrome;
    private session;
    private currentMedia;
    private window;
    status: {
        casting: boolean;
    };
    constructor();
    initializeCastApi(): void;
    onInitSuccess: () => void;
    onError: (err: any) => void;
    discoverDevices: () => Subject<{}>;
    launchMedia: (media: any) => boolean;
    onMediaDiscovered: (url: string, type: string) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    onMediaError: (err: any) => void;
    setCasting(value: any): void;
    getStatus(): {
        casting: boolean;
    };
}
