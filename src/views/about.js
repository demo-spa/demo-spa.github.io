import { html } from '../lib.js';


const aboutTemplate = () => html`
<h2>About Page</h2>`;


export function showAbout(ctx) {
    ctx.render(aboutTemplate());
}