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
    onMediaDiscovered: (categories: any[]) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    onMediaError: (err: any) => void;
    setCasting(value: any): void;
    getStatus(): {
        casting: boolean;
    };
}
