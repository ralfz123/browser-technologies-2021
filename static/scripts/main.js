import { previewFile } from './previewImage.js';
import { slideshow } from './slideshow.js';

previewFile();
slideshow();

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker
//       .register('./service-worker.js')
//       .then(function (registration) {
//         return registration.update();
//       });
//   });
// }
