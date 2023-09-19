import { html } from '../lib.js';


const homeTemplate = () => html`
<h2>Home Page</h2>`;

export function showHome(ctx) {
    ctx.render(homeTemplate());
}