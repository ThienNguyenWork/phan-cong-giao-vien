import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './App'; // Import từ file App.ts đã đổi tên

bootstrapApplication(AppComponent).catch((err) => console.error(err));