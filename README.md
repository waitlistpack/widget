# WaitlistPack Widget

A zero-dependency, embeddable **"Join the waitlist"** form. Drop a single
`<script>` tag onto any website and visitors can sign up to the waitlist
registered for that domain — no React, no iframe, no build step.

- **One tag.** A single self-contained `<script>`, ~6 KB gzipped.
- **Isolated.** Renders inside an open Shadow DOM, so your site's CSS can't
  break it and its styles never leak out.
- **Zero dependencies.** Plain JavaScript — works on any site, any stack.
- **Themeable.** Light / dark / auto, CSS custom properties, and `::part`
  selectors for full control.
- **Localized.** English and Chinese strings built in.

> You need a [WaitlistPack](https://waitlistpack.com) account with a waitlist
> registered for your site's domain. The widget matches the page's hostname to
> that waitlist automatically.

## Quick start

```html
<script
  src="https://cdn.jsdelivr.net/gh/waitlistpack/widget@v1.0.0/widget.js"
  data-waitlistpack
></script>
```

That's it. The widget renders right after the script tag, auto-detects
`window.location.hostname` to find the right waitlist, and submits to the
public WaitlistPack API.

> **Pin a version.** `@1` always serves the latest `1.x` release (recommended —
> you get bug fixes automatically). For a fully reproducible embed, pin an exact
> tag such as `@1.0.0`. See [Versioning](#versioning).

### Multiple widgets / explicit placement

Put a container wherever you want a form to appear. Each one is fully
independent — its own language, theme, and attribution:

```html
<div data-waitlistpack-widget data-lang="en" data-theme="light"></div>
<div data-waitlistpack-widget data-lang="zh" data-name-field="show"></div>
```

### Imperative API

Disable auto-mount and place the widget yourself:

```html
<script
  src="https://cdn.jsdelivr.net/gh/waitlistpack/widget@v1.0.0/widget.js"
  data-autoload="false"
></script>
<script>
  WaitlistPack.init({
    target: '#hero-signup',
    lang: 'en',
    theme: 'auto',
    onSuccess(e) {
      console.log('subscribed:', e.email);
    },
  });
</script>
```

## Options

Every option works as a `data-*` attribute on the script tag, on a
`[data-waitlistpack-widget]` container, or as a key passed to
`WaitlistPack.init({ … })`.

| Attribute           | Values                      | Default                        | Description                                   |
| ------------------- | --------------------------- | ------------------------------ | --------------------------------------------- |
| `data-api-url`      | URL                         | `https://api.waitlistpack.com` | API origin                                    |
| `data-domain`       | hostname                    | `window.location.hostname`     | Identifies the waitlist on the server         |
| `data-lang`         | `en` \| `zh`                | browser preference             | UI language                                   |
| `data-theme`        | `light` \| `dark` \| `auto` | `auto`                         | Colour scheme (auto follows OS)               |
| `data-name-field`   | `show` \| `hide`            | `hide`                         | Show an optional name input                   |
| `data-gdpr`         | `true` \| `false`           | `false`                        | Require a consent checkbox                    |
| `data-redirect`     | URL                         | —                              | Redirect after success                        |
| `data-button-text`  | string                      | localized "Join"               | Override the submit-button label              |
| `data-placeholder`  | string                      | localized "your@email.com"     | Override the email-input placeholder          |
| `data-success-text` | string                      | localized default              | Override the success message                  |
| `data-source`       | string                      | —                              | Sent as `metadata.utm_source` for attribution |
| `data-target`       | CSS selector                | —                              | (script tag only) mount inside this element   |
| `data-autoload`     | `true` \| `false`           | `true`                         | (script tag only) disable auto-mount          |

## Styling

The widget renders inside an **open Shadow DOM**, so host-page CSS can't reach
in and break it. To theme it, set CSS custom properties on the
`waitlistpack-widget` element — custom properties cross the shadow boundary:

```css
waitlistpack-widget {
  --wlp-accent: hsl(280 80% 60%);
  --wlp-radius: 4px;
}
```

Available variables:

`--wlp-bg`, `--wlp-fg`, `--wlp-muted`, `--wlp-border`, `--wlp-border-strong`,
`--wlp-accent`, `--wlp-accent-fg`, `--wlp-accent-hover`, `--wlp-error-bg`,
`--wlp-error-fg`, `--wlp-error-border`, `--wlp-success-bg`, `--wlp-success-fg`,
`--wlp-success-border`, `--wlp-radius`, `--wlp-radius-sm`.

For full restyling, the shadow root exposes a `part` on every visible element,
targetable from your global CSS with `::part()`:

```css
waitlistpack-widget::part(root) {
  background: black;
  color: white;
}
waitlistpack-widget::part(title) {
  font-family: 'Cal Sans', sans-serif;
}
```

Available parts: `root`, `title`, `subtitle`, `form`, `error`, `success`,
`footnote`, `brand`.

## Events

The widget dispatches a `waitlistpack:success` event on successful signup:

```js
document.addEventListener('waitlistpack:success', (e) => {
  console.log('email:', e.detail.email, 'position:', e.detail.position);
});
```

The event bubbles and is `composed: true`, so a single listener on `document`
catches signups from every widget on the page, wherever it's mounted. The
imperative `WaitlistPack.init({ onSuccess })` callback fires for that instance
only.

## Using React or Vue?

If you're building a React or Vue 3 app, use the framework packages instead of
a raw `<script>` tag. They mount the same widget, are SSR-safe, and ship full
TypeScript types:

- **React** — [`@waitlistpack/react`](https://www.npmjs.com/package/@waitlistpack/react)
- **Vue 3** — [`@waitlistpack/vue`](https://www.npmjs.com/package/@waitlistpack/vue)

## Versioning

This widget is served straight from GitHub via [jsDelivr](https://www.jsdelivr.com/).
Releases are tagged `1.0.0`, `1.0.1`, `1.1.0`, … and you choose how tightly to pin:

| URL suffix   | Resolves to             | Use when                              |
| ------------ | ----------------------- | ------------------------------------- |
| `@1`         | latest `1.x` release    | **Recommended** — auto bug/security fixes |
| `@1.2`       | latest `1.2.x` patch    | Pin a minor line                      |
| `@1.2.3`     | exactly `1.2.3`         | Fully reproducible / audited embeds   |

Every version is cached immutably on jsDelivr's global CDN and served with
Brotli compression. Avoid pointing at a branch (e.g. `@main`) in production — it
isn't immutable and is cached for a limited time.

## License

MIT
