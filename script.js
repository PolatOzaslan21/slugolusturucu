const input = document.getElementById('inputText');
const outputEl = document.getElementById('slugOutput');
const resultGroup = document.getElementById('resultGroup');
const charCount = document.getElementById('charCount');
const optLower = document.getElementById('optLower');
const optDash = document.getElementById('optDash');
const optTrim = document.getElementById('optTrim');

const trMap = {'ç':'c','ğ':'g','ı':'i','ö':'o','ş':'s','ü':'u','Ç':'C','Ğ':'G','İ':'I','Ö':'O','Ş':'S','Ü':'U'};

function toSlug(text) {
  let slug = text.replace(/[çğışöüÇĞİŞÖÜ]/g, m => trMap[m] || m);
  slug = slug.replace(/[^a-zA-Z0-9\s-]/g, '');
  const sep = optDash.checked ? '-' : '_';
  slug = slug.replace(/\s+/g, sep);
  slug = slug.replace(/[- ]+/g, sep);
  if (optLower.checked) slug = slug.toLowerCase();
  if (optTrim.checked) slug = slug.replace(new RegExp('^[' + sep + ']+|[' + sep + ']+$', 'g'), '');
  return slug;
}

function update() {
  const val = input.value.trim();
  if (!val) { resultGroup.style.display = 'none'; return; }
  const slug = toSlug(val);
  outputEl.value = slug;
  charCount.textContent = slug.length + ' karakter';
  resultGroup.style.display = 'block';
}

input.addEventListener('input', update);
[optLower, optDash, optTrim].forEach(cb => cb.addEventListener('change', update));

function copySlug() {
  if (!outputEl.value) return;
  navigator.clipboard.writeText(outputEl.value).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = 'Kopyalandı!';
    btn.style.background = '#437a22';
    setTimeout(() => { btn.textContent = 'Kopyala'; btn.style.background = ''; }, 1800);
  }).catch(() => {});
}