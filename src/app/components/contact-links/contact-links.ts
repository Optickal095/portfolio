import { Component, input } from '@angular/core';
import { siGithub } from 'simple-icons';
import { PROFILE } from '../../data/portfolio.data';

/** Email, phone, LinkedIn and GitHub as one row of icon links (hero and contact section). */
@Component({
  selector: 'app-contact-links',
  template: `
    <ul>
      @if (withEmail()) {
        <li>
          <a [href]="'mailto:' + profile.email">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="stroke">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {{ profile.email }}
          </a>
        </li>
      }
      <li>
        <a [href]="'tel:' + profile.phone.replaceAll(' ', '')">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="stroke">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            />
          </svg>
          {{ profile.phone }}
        </a>
      </li>
      <li>
        <a [href]="profile.linkedin" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="stroke">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          LinkedIn
        </a>
      </li>
      <li>
        <a [href]="profile.github" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path [attr.d]="githubPath" /></svg>
          GitHub
        </a>
      </li>
    </ul>
  `,
  styles: `
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 24px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--text);
      text-decoration: none;
      overflow-wrap: anywhere;
    }

    a:hover {
      color: var(--accent);
    }

    svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      fill: currentColor;
      color: var(--accent);
    }

    svg.stroke {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class ContactLinks {
  /** The contact section shows the email on its own, so it can leave it out here. */
  readonly withEmail = input(true);
  protected readonly profile = PROFILE;
  protected readonly githubPath = siGithub.path;
}
