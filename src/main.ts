import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import AOS from 'aos';
import 'aos/dist/aos.css'

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
AOS.init({
    duration: 1200, // animation duration (in ms)
    once: true,     // only animate once when scrolled into view
  });
