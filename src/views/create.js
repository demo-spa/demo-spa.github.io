import { html } from '../lib.js';


const createTemplate = () => html`
<h2>Create Product</h2>`;

export function showCreate(ctx) {
    ctx.render(createTemplate());
}