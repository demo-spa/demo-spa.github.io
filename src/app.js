import page from './lib.js';
import { render, html, nothing } from './lib.js';

import { showAbout } from './views/about.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { notFound } from './views/notFound.js';
import { showLogin } from './views/login.js';
import { getUserData } from './util.js';
import { showRegsiter } from './views/register.js';
import { logout } from './data/auth.js';

const subUrl = '/spa-modular-demo';
//const subUrl = '';
const navTemplate = (user) => html`
<a href="${subUrl}/">Home</a>
<a href="${subUrl}/recipes">Catalog</a>
${user ? html`<a href="${subUrl}/create">Create</a>` : nothing}
<a href="${subUrl}/about">About</a>
${user ? html`<span>Welcome, ${user.username}</span><a href="${subUrl}/logout">Logout</a>` : html`<a href="${subUrl}/login">Login</a>
<a href="${subUrl}/register">Register</a>`}
`;

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}

function decorateContext(ctx, next) {
    render(navTemplate(ctx.user), document.querySelector('nav'));

    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    };
    next();
}

function parseQuery(ctx, next) {
    console.log('ctx', ctx)
    ctx.query = {};
    if (ctx.querystring) {

        const query = Object.fromEntries(ctx.querystring
            .split('&')
            .map(e => e.split('=')));
        Object.assign(ctx.query, query);
    }

    next();
}

function session(ctx, next) {
    const user = getUserData();

    if (user) {
        ctx.user = user;
    }

    next();
}

page(session);
page(decorateContext);
page(parseQuery);
page.base('/spa-modular-demo');
page('/index.html', '/');
page('/', showHome);
page('/recipes', showCatalog);
page('/create', showCreate);
page('/recipes/:id', showDetails);
page('/about', showAbout);
page('/login', showLogin);
page('/register', showRegsiter);
page('/logout', onLogout);
page('*', notFound);


page.start();