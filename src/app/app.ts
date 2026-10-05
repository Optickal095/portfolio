import { Component } from '@angular/core';
import { Contact } from './components/contact/contact';
import { Education } from './components/education/education';
import { Experience } from './components/experience/experience';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Projects } from './components/projects/projects';
import { Tech } from './components/tech/tech';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Experience, Projects, Tech, Education, Contact, Footer],
  templateUrl: './app.html',
})
export class App {}
