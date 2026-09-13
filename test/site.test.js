const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');
const hbs = require('hbs');
let server;
let base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => server.close(resolve)));

test('MVC and retained static pages have working internal links and assets', async () => {
  const visited = new Set();
  for (const route of ['/', '/travel', '/travel/', '/index.html', '/travel.html', '/rooms.html', '/meals.html', '/news.html', '/about.html', '/contact.html']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    assert.equal((html.match(/id="header"/g) || []).length, 1);
    assert.equal((html.match(/id="footer"/g) || []).length, 1);
    assert.equal((html.match(/<!DOCTYPE html>/g) || []).length, 1);
    if (!route.endsWith('.html')) {
      assert.match(html, /<title>Travlr Getaways<\/title>/);
      assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
    }
    assert.doesNotMatch(html, /\{\{|[=][“”]/);
    for (const [, link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|#)/.test(link)) continue;
      const url = new URL(link, base + route).href;
      if (!visited.has(url)) {
        visited.add(url);
        assert.equal((await fetch(url)).status, 200, `${route} -> ${link}`);
      }
    }
  }
  const css = await (await fetch(base + '/css/style.css')).text();
  for (const [, asset] of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
    assert.equal((await fetch(new URL(asset, base + '/css/style.css'))).status, 200, asset);
  }
});

test('travel renders registered partials rather than serving public HTML', async () => {
  await fetch(base + '/travel');
  const original = hbs.handlebars.partials.header;
  try {
    hbs.registerPartial('header', '<header>Partial rendering verified</header>');
    const html = await (await fetch(base + '/travel')).text();
    assert.match(html, /<header>Partial rendering verified<\/header>/);
    assert.equal((html.match(/<h2><a href="\/travel">/g) || []).length, 3);
    for (const name of ['Gale Reef', 'Dawson’s Reef', 'Claire’s REEF']) assert.ok(html.includes(name));
    const staticHtml = await (await fetch(base + '/travel.html')).text();
    assert.doesNotMatch(staticHtml, /Partial rendering verified/);
  } finally { hbs.registerPartial('header', original); }
});

test('previous clean page URLs and old template links still work', async () => {
  for (const page of ['rooms', 'meals', 'news', 'about', 'contact']) {
    const response = await fetch(`${base}/${page}`, { redirect: 'manual' });
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('location'), '/' + page + '.html');
  }
  for (const [old, target] of [['dives', '/travel'], ['foods', '/meals.html']]) {
    const response = await fetch(`${base}/${old}.html`, { redirect: 'manual' });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), target);
  }
});

test('moved users router and error layout render correctly', async () => {
  assert.equal(await (await fetch(base + '/users')).text(), 'respond with a resource');
  const missing = await fetch(base + '/missing-page');
  assert.equal(missing.status, 404);
  const html = await missing.text();
  assert.match(html, /Not Found/);
  assert.equal((html.match(/<!DOCTYPE html>/g) || []).length, 1);
  assert.match(html, /<title>Error - Travlr Getaways<\/title>/);
});
