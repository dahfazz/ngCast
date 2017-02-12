# ngCast
Broadcast media on your TV from your Angular app

## Installation
```node
sudo npm install ng-cast
```

Then, import ngCast in your app.module.ts

```javascript
import { NgCastModule } from 'ng-cast';
```

```javascript
@NgModule({
  ...
  imports: [
    ...
    NgCastModule
  ],
```

In one of your template, insert a button to select your Chromecast and connect on it
```html
<ng-cast></ng-cast>
```

In one of your app components, 
```javascript
import { NgCastService } from 'ng-cast';
...
constructor(
    ...
    private ngCastService: NgCastService
  ) { }
```

You are now able to broadcast any image or video to your TV
```javascript
this.ngCastService.launchMedia(mediaUrl); 
// ex. this.ngCastService.launchMedia('http://25.media.tumblr.com/tumblr_m4c8cxLOQv1rwa0vgo1_250.gif')
```

## Customisation
You can modify cast button appearance editing ng-cast/ng-cast.component.scss
*If you use CSS files in your project, you just need to change ng-cast.component.scss file extension*

## Online demo
https://gif-caster.firebaseapp.com/
