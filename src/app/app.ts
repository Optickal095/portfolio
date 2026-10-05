import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Ask } from './components/ask/ask';
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
  imports: [Header, Hero, Ask, Experience, Projects, Tech, Education, Contact, Footer],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    // index.html is shared by both languages, so the translated title and
    // description are set here.
    inject(Title).setTitle(
      $localize`:@@meta.title:Eduardo Hernández Oyarzún — Ingeniero Fullstack`,
    );
    inject(Meta).updateTag({
      name: 'description',
      content: $localize`:@@meta.description:Portfolio de Eduardo Hernández Oyarzún, Ingeniero Informático fullstack: Angular, React, Node.js/NestJS, Google Cloud e IA.`,
    });
  }
}
