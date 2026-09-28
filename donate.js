/* Donate box, powered by Paystack (https://paystack.com).
   Settings live in js/config.js. */
(function () {
  var cfg = window.RTBF_CONFIG || {};
  var form = document.getElementById('donate-form');
  if (!form) return;

  var sym = cfg.CURRENCY_SYMBOL || '$';
  var amountsEl = document.getElementById('amounts');
  var custom = document.getElementById('custom-amount');
  var customRadio = document.getElementById('amt-custom');
  var freq = document.getElementById('freq');
  var cover = document.getElementById('cover-fee');
  var feeEl = document.getElementById('fee-amt');
  var totalEl = document.getElementById('total-amt');
  var totalLabel = document.getElementById('total-label');
  var email = document.getElementById('donor-email');
  var statusEl = document.getElementById('donate-status');
  var btn = document.getElementById('donate-btn');
  var feePct = typeof cfg.FEE_PERCENT === 'number' ? cfg.FEE_PERCENT : 3;

  // Build the quick-pick radios
  (cfg.AMOUNTS || [10, 20, 30, 40]).forEach(function (a, i) {
    var l = document.createElement('label');
    l.className = 'check';
    l.innerHTML = '<input type="radio" name="amt" value="' + a + '"' + (i === 0 ? ' checked' : '') + '> <span>' + sym + a + '.00</span>';
    amountsEl.appendChild(l);
  });

  function money(n) { return sym + n.toFixed(2); }
  function selected() {
    var r = form.querySelector('input[name="amt"]:checked');
    if (!r) return 0;
    if (r.value === 'custom') return parseFloat(custom.value) || 0;
    return parseFloat(r.value);
  }
  function monthly() { return freq.value === 'monthly'; }
  function feeApplies() { return cover.checked && !monthly(); }   // monthly plans have fixed amounts
  function update() {
    custom.hidden = !customRadio.checked;
    var base = selected();
    var fee = feeApplies() ? Math.round(base * feePct) / 100 : 0;
    feeEl.textContent = money(fee);
    totalEl.textContent = money(base + fee);
    totalLabel.textContent = monthly() ? 'Total per month' : 'Total';
    cover.disabled = monthly();
    if (monthly()) cover.parentNode.style.opacity = .5; else cover.parentNode.style.opacity = 1;
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();

  function say(msg, cls) { statusEl.textContent = msg; statusEl.className = 'donate-status ' + (cls || ''); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var base = selected();
    if (!(base >= 1)) { say('Please choose or enter an amount.', 'err'); return; }
    if (!email.value || !email.checkValidity()) { say('Please enter a valid email address for your receipt.', 'err'); email.focus(); return; }

    if (!cfg.PAYSTACK_PUBLIC_KEY) {
      say('Online donations are opening soon. To give now, please email ' + (cfg.CONTACT_EMAIL || 'info@righttobefree.org') + ' and we will help you right away.', 'err');
      return;
    }
    if (typeof window.PaystackPop === 'undefined') { say('The payment window could not load. Please check your connection and try again.', 'err'); return; }

    var opts = {
      key: cfg.PAYSTACK_PUBLIC_KEY,
      email: email.value,
      currency: cfg.CURRENCY || 'GHS',
      metadata: { source: 'righttobefree website', frequency: freq.value },
      onSuccess: function (t) { say('Thank you! Your gift was received (reference ' + t.reference + '). A receipt will be sent to ' + email.value + '.', 'ok'); form.reset(); update(); btn.disabled = false; },
      onCancel: function () { say('Payment window closed. No money was taken.', ''); btn.disabled = false; }
    };

    if (monthly()) {
      var plan = (cfg.PLAN_CODES || {})[String(base)];
      if (!plan) { say('Monthly giving is not set up for that amount yet. Please choose "One-time Donation" or one of the preset amounts.', 'err'); return; }
      opts.plan = plan;              // Paystack uses the plan's amount
      opts.amount = Math.round(base * 100);
    } else {
      var fee = feeApplies() ? Math.round(base * feePct) / 100 : 0;
      opts.amount = Math.round((base + fee) * 100);   // Paystack wants the smallest unit (pesewas / cents)
    }

    btn.disabled = true;
    say('Opening secure payment window…', '');
    try { new window.PaystackPop().newTransaction(opts); }
    catch (err) { say('Sorry, something went wrong. Please email ' + (cfg.CONTACT_EMAIL || 'info@righttobefree.org') + '.', 'err'); btn.disabled = false; }
  });
})();
