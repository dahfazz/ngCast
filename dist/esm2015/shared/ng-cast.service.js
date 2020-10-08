import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let NgCastService = class NgCastService {
    constructor() {
        this.window = window;
        this.status = {
            casting: false
        };
        this.onInitSuccess = function () {
            console.log('GCast initialization success');
        };
        this.onError = function (err) {
            console.log('GCast initialization failed', err);
        };
        this.discoverDevices = () => {
            let self = this;
            let subj = new Subject();
            this.cast.requestSession((s) => {
                self.session = s;
                self.setCasting(true);
                subj.next('CONNECTED');
            }, function (err) {
                self.setCasting(false);
                if (err.code === 'cancel') {
                    self.session = undefined;
                    subj.next('CANCEL');
                }
                else {
                    console.error('Error selecting a cast device', err);
                }
            });
            return subj;
        };
        this.launchMedia = (media) => {
            let mediaInfo = new this.cast.media.MediaInfo(media);
            let request = new this.cast.media.LoadRequest(mediaInfo);
            console.log('launch media with session', this.session);
            if (!this.session) {
                window.open(media);
                return false;
            }
            this.session.loadMedia(request, this.onMediaDiscovered.bind(this, 'loadMedia'), this.onMediaError);
            return true;
        };
        this.onMediaDiscovered = (media) => {
            this.currentMedia = media;
        };
        this.play = () => {
            this.currentMedia.play(null);
        };
        this.pause = () => {
            this.currentMedia.pause(null);
        };
        this.stop = () => {
            this.currentMedia.stop(null);
        };
        this.onMediaError = (err) => {
            console.error('Error launching media', err);
        };
    }
    initializeCastApi() {
        this.cast = this.window['chrome'].cast;
        let sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
        let apiConfig = new this.cast.ApiConfig(sessionRequest, () => { }, (status) => { if (status === this.cast.ReceiverAvailability.AVAILABLE) { } });
        let x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
    }
    ;
    onGCastApiAvailable(url, type) {
        this.window.__onGCastApiAvailable = (isAvailable) => {
            if (!isAvailable) {
                return false;
            }
            this.cast = this.window['chrome'].cast;
            this.chrome = this.window['chrome'];
            var castContext = this.cast.framework.CastContext.getInstance();
            castContext.setOptions({
                autoJoinPolicy: this.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
                receiverApplicationId: this.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
            });
            var stateChanged = this.cast.framework.CastContextEventType.CAST_STATE_CHANGED;
            castContext.addEventListener(stateChanged, () => {
                var castSession = castContext.getCurrentSession();
                var media = new this.chrome.cast.media.MediaInfo(url, type);
                var request = new this.chrome.cast.media.LoadRequest(media);
                castSession && castSession
                    .loadMedia(request)
                    .then(() => {
                    console.log('Success');
                })
                    .catch((error) => {
                    console.log('Error: ' + error);
                });
            });
        };
    }
    setCasting(value) {
        this.status.casting = value;
    }
    getStatus() {
        return this.status;
    }
};
NgCastService = tslib_1.__decorate([
    Injectable()
], NgCastService);
export { NgCastService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3RoaW5rZXIvZGV2L3RoaW5rYW0vbmdDYXN0LyIsInNvdXJjZXMiOlsic2hhcmVkL25nLWNhc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFVeEI7UUFMUSxXQUFNLEdBQVEsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBRztZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztRQWdERixrQkFBYSxHQUFHO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQztRQUVGLFlBQU8sR0FBRyxVQUFVLEdBQVE7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUM7UUFFRixvQkFBZSxHQUFHLEdBQUcsRUFBRTtZQUNyQixJQUFJLElBQUksR0FBUSxJQUFJLENBQUM7WUFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixDQUFDLEVBQUUsVUFBVSxHQUFRO2dCQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29C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QyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtvQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBOERELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQTNIWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTtHQUNBLGFBQWEsQ0EySHpCO1NBM0hZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nQ2FzdFNlcnZpY2Uge1xuICBwcml2YXRlIGNhc3Q6IGFueTtcbiAgcHJpdmF0ZSBjaHJvbWU6IGFueTtcbiAgcHJpdmF0ZSBzZXNzaW9uOiBhbnk7XG4gIHByaXZhdGUgY3VycmVudE1lZGlhOiBhbnk7XG4gIHByaXZhdGUgd2luZG93OiBhbnkgPSB3aW5kb3c7XG4gIHB1YmxpYyBzdGF0dXMgPSB7XG4gICAgY2FzdGluZzogZmFsc2VcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgaW5pdGlhbGl6ZUNhc3RBcGkoKSB7XG4gICAgdGhpcy5jYXN0ID0gdGhpcy53aW5kb3dbJ2Nocm9tZSddLmNhc3Q7XG4gICAgbGV0IHNlc3Npb25SZXF1ZXN0ID0gbmV3IHRoaXMuY2FzdC5TZXNzaW9uUmVxdWVzdCh0aGlzLmNhc3QubWVkaWEuREVGQVVMVF9NRURJQV9SRUNFSVZFUl9BUFBfSUQpO1xuICAgIGxldCBhcGlDb25maWcgPSBuZXcgdGhpcy5jYXN0LkFwaUNvbmZpZyhzZXNzaW9uUmVxdWVzdCxcbiAgICAgICgpID0+IHsgfSxcbiAgICAgIChzdGF0dXM6IGFueSkgPT4geyBpZiAoc3RhdHVzID09PSB0aGlzLmNhc3QuUmVjZWl2ZXJBdmFpbGFiaWxpdHkuQVZBSUxBQkxFKSB7IH0gfVxuICAgICk7XG4gICAgbGV0IHggPSB0aGlzLmNhc3QuaW5pdGlhbGl6ZShhcGlDb25maWcsIHRoaXMub25Jbml0U3VjY2VzcywgdGhpcy5vbkVycm9yKTtcbiAgfTtcblxuICBvbkdDYXN0QXBpQXZhaWxhYmxlKHVybDogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5fX29uR0Nhc3RBcGlBdmFpbGFibGUgPSAoaXNBdmFpbGFibGU6IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmKCFpc0F2YWlsYWJsZSl7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLmNhc3QgPSB0aGlzLndpbmRvd1snY2hyb21lJ10uY2FzdDtcbiAgICAgIHRoaXMuY2hyb21lID0gdGhpcy53aW5kb3dbJ2Nocm9tZSddO1xuXG4gICAgICB2YXIgY2FzdENvbnRleHQgPSB0aGlzLmNhc3QuZnJhbWV3b3JrLkNhc3RDb250ZXh0LmdldEluc3RhbmNlKCk7XG4gIFxuICAgICAgY2FzdENvbnRleHQuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgYXV0b0pvaW5Qb2xpY3k6IHRoaXMuY2hyb21lLmNhc3QuQXV0b0pvaW5Qb2xpY3kuT1JJR0lOX1NDT1BFRCxcbiAgICAgICAgICByZWNlaXZlckFwcGxpY2F0aW9uSWQ6IHRoaXMuY2hyb21lLmNhc3QubWVkaWEuREVGQVVMVF9NRURJQV9SRUNFSVZFUl9BUFBfSURcbiAgICAgIH0pO1xuICBcbiAgICAgIHZhciBzdGF0ZUNoYW5nZWQgPSB0aGlzLmNhc3QuZnJhbWV3b3JrLkNhc3RDb250ZXh0RXZlbnRUeXBlLkNBU1RfU1RBVEVfQ0hBTkdFRDtcbiAgICAgIGNhc3RDb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoc3RhdGVDaGFuZ2VkLCAoKSA9PiB7XG4gICAgICAgICAgdmFyIGNhc3RTZXNzaW9uID0gY2FzdENvbnRleHQuZ2V0Q3VycmVudFNlc3Npb24oKTtcbiAgICAgICAgICB2YXIgbWVkaWEgPSBuZXcgdGhpcy5jaHJvbWUuY2FzdC5tZWRpYS5NZWRpYUluZm8odXJsLCB0eXBlKTtcbiAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyB0aGlzLmNocm9tZS5jYXN0Lm1lZGlhLkxvYWRSZXF1ZXN0KG1lZGlhKTtcbiAgXG4gICAgICAgICAgY2FzdFNlc3Npb24gJiYgY2FzdFNlc3Npb25cbiAgICAgICAgICAgICAgLmxvYWRNZWRpYShyZXF1ZXN0KVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2VzcycpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgb25Jbml0U3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnR0Nhc3QgaW5pdGlhbGl6YXRpb24gc3VjY2VzcycpO1xuICB9O1xuXG4gIG9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZygnR0Nhc3QgaW5pdGlhbGl6YXRpb24gZmFpbGVkJywgZXJyKTtcbiAgfTtcblxuICBkaXNjb3ZlckRldmljZXMgPSAoKSA9PiB7XG4gICAgbGV0IHNlbGY6IGFueSA9IHRoaXM7XG4gICAgbGV0IHN1YmogPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMuY2FzdC5yZXF1ZXN0U2Vzc2lvbigoczogYW55KSA9PiB7XG4gICAgICBzZWxmLnNlc3Npb24gPSBzO1xuICAgICAgc2VsZi5zZXRDYXN0aW5nKHRydWUpO1xuICAgICAgc3Viai5uZXh0KCdDT05ORUNURUQnKTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyOiBhbnkpIHtcbiAgICAgIHNlbGYuc2V0Q2FzdGluZyhmYWxzZSk7XG4gICAgICBpZiAoZXJyLmNvZGUgPT09ICdjYW5jZWwnKSB7XG4gICAgICAgIHNlbGYuc2Vzc2lvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgc3Viai5uZXh0KCdDQU5DRUwnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbGVjdGluZyBhIGNhc3QgZGV2aWNlJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3ViajtcbiAgfTtcblxuICBsYXVuY2hNZWRpYSA9IChtZWRpYTogYW55KSA9PiAge1xuICAgIGxldCBtZWRpYUluZm8gPSBuZXcgdGhpcy5jYXN0Lm1lZGlhLk1lZGlhSW5mbyhtZWRpYSk7XG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgdGhpcy5jYXN0Lm1lZGlhLkxvYWRSZXF1ZXN0KG1lZGlhSW5mbyk7XG4gICAgY29uc29sZS5sb2coJ2xhdW5jaCBtZWRpYSB3aXRoIHNlc3Npb24nLCB0aGlzLnNlc3Npb24pO1xuXG4gICAgaWYgKCF0aGlzLnNlc3Npb24pIHtcbiAgICAgIHdpbmRvdy5vcGVuKG1lZGlhKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZXNzaW9uLmxvYWRNZWRpYShyZXF1ZXN0LCB0aGlzLm9uTWVkaWFEaXNjb3ZlcmVkLmJpbmQodGhpcywgJ2xvYWRNZWRpYScpLCB0aGlzLm9uTWVkaWFFcnJvcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgb25NZWRpYURpc2NvdmVyZWQgPSAobWVkaWE6IGFueSkgPT4ge1xuICAgIHRoaXMuY3VycmVudE1lZGlhID0gbWVkaWE7XG4gIH07XG5cbiAgcGxheSA9ICgpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRNZWRpYS5wbGF5KG51bGwpO1xuICB9O1xuXG4gIHBhdXNlID0gKCkgPT4ge1xuICAgIHRoaXMuY3VycmVudE1lZGlhLnBhdXNlKG51bGwpO1xuICB9O1xuXG4gIHN0b3AgPSAoKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50TWVkaWEuc3RvcChudWxsKTtcbiAgfTtcblxuICBvbk1lZGlhRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsYXVuY2hpbmcgbWVkaWEnLCBlcnIpO1xuICB9O1xuXG4gIHNldENhc3RpbmcodmFsdWU6IGFueSkge1xuICAgIHRoaXMuc3RhdHVzLmNhc3RpbmcgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldFN0YXR1cygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXNcbiAgfVxufVxuIl19