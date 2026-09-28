/* ------------------------------------------------------------------
   Right To Be Free – settings you may need to change.
   Nothing secret goes in this file: it is public on the internet.
   (A Paystack PUBLIC key is safe here. NEVER paste the SECRET key.)
   ------------------------------------------------------------------ */
window.RTBF_CONFIG = {

  /* --- Donations (Paystack) ------------------------------------------
     1. When your Paystack account is approved, go to
        Settings > API Keys & Webhooks and copy the PUBLIC key
        (starts with pk_live_ ... or pk_test_ ... for testing).
     2. Paste it below. Until then the Donate button shows a friendly
        "coming soon" message with the email address instead.            */
  PAYSTACK_PUBLIC_KEY: "",

  /* Currency the Paystack account can accept. "GHS" always works for a
     Ghana account. "USD" only works if Paystack has enabled USD for you. */
  CURRENCY: "USD",
  CURRENCY_SYMBOL: "$",

  /* The quick-pick amounts shown on the donate box. */
  AMOUNTS: [10, 20, 30, 40],

  /* The fee-cover option adds this percentage to the donation. */
  FEE_PERCENT: 3,

  /* Monthly giving in Paystack needs a "Plan" for each amount.
     Create them in the dashboard (Payments > Plans, interval: monthly),
     then paste each plan code here. Leave "" and monthly giving will
     ask people to choose one-time for now. */
  PLAN_CODES: { "10": "", "20": "", "30": "", "40": "" },

  /* --- Newsletter sign-up ---------------------------------------------
     Paste your Mailchimp "hosted signup form" link here (Mailchimp >
     Audience > Signup forms > Form builder > copy the link).
     If empty, the Sign up button opens an email to info@righttobefree.org. */
  SUBSCRIBE_URL: "",

  CONTACT_EMAIL: "info@righttobefree.org"
};
