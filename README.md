# Right To Be Free website

A plain HTML/CSS/JS site (no build step). It runs free on GitHub Pages.

## Files

- `index.html`, `our-kids.html`, `learn-more.html`, `contact.html` – the four pages
- `css/site.css` – all colours and layout (colours are at the top of the file)
- `js/config.js` – **the settings you edit**: Paystack key, newsletter link, donation amounts
- `js/donate.js`, `js/main.js` – donate box, menu, carousel
- `images/` – all photos (see IMAGES-NEEDED.txt)

## Go live (no command line needed)

1. In your GitHub repo, use **Add file > Upload files** and drag in everything in this folder (keep the folder structure).
2. Repo **Settings > Pages > Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`. Save.
3. After a minute the site appears at `https://rtbfghana.github.io/Right-To-Be-Free/`.

## Contact form (Formspree, free tier)

1. Make a free account at formspree.io and create a form that delivers to `info@righttobefree.org`.
2. Copy the form ID (the part after `/f/`).
3. In `contact.html`, replace `YOUR_FORM_ID` in `https://formspree.io/f/YOUR_FORM_ID`.

## Donations (Paystack)

1. When the Paystack account is approved, copy the **public** key (Settings > API Keys & Webhooks).
2. Paste it into `PAYSTACK_PUBLIC_KEY` in `js/config.js`. **Never** paste the secret key anywhere in this repo.
3. Use `CURRENCY: "GHS"` unless Paystack has enabled USD for the account. If you switch to GHS, change `AMOUNTS` and `CURRENCY_SYMBOL` too.
4. For monthly giving, create a monthly Plan per amount in the Paystack dashboard and paste the plan codes into `PLAN_CODES`. Until you do, monthly gifts ask donors to choose one-time.
5. Test with a `pk_test_` key first.

Until a key is added, the Donate button politely tells visitors to email the office.

## Newsletter sign-up

Paste your Mailchimp signup-form link into `SUBSCRIBE_URL` in `js/config.js`.

## Custom domain (righttobefree.org)

1. Repo **Settings > Pages > Custom domain**: enter `righttobefree.org`, save.
2. At the domain's registrar add the DNS records GitHub lists (four `A` records for the apex and a `CNAME` for `www` pointing at `rtbfghana.github.io`).
3. Tick **Enforce HTTPS** once it becomes available.
4. Do this only after everything above works, and before cancelling Squarespace.

## Editing text later

Open the page on GitHub, click the pencil icon, edit, and commit. The site updates in about a minute. To add a news item, copy one `<a class="rtbf-tile">` block in `index.html`. To add a newsletter, add an `<li>` inside the right year in `our-kids.html`.
