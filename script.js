'use strict';

const form = document.querySelector('#access-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const nameInput = document.querySelector('#name');
const remember = document.querySelector('#remember');
const status = document.querySelector('#form-status');
const submitButton = document.querySelector('.submit-button');
const submitLabel = document.querySelector('#submit-label');
const buttonText = document.querySelector('#button-text');
const modeSwitch = document.querySelector('#mode-switch');
const showPassword = document.querySelector('.show-password');
const effectsToggle = document.querySelector('#effects-toggle');
const storageKey = 'blood-tape-remembered-email';
let registering = false;
let busy = false;
let timer;

// Armazene somente o e-mail, com consentimento. Nunca persista senhas.
try {
  const savedEmail = localStorage.getItem(storageKey);
  if (savedEmail && savedEmail.length <= 254) {
    email.value = savedEmail;
    remember.checked = true;
  }
} catch { /* O formulário também funciona com armazenamento bloqueado. */ }

function syncRememberedEmail() {
  try {
    if (remember.checked) localStorage.setItem(storageKey, email.value.trim());
    else localStorage.removeItem(storageKey);
  } catch { /* A preferência é opcional, inclusive no modo privado. */ }
}

remember.addEventListener('change', () => {
  if (!remember.checked) syncRememberedEmail();
});

function setError(input, message) {
  input.setAttribute('aria-invalid', String(Boolean(message)));
  document.querySelector(`#${input.id}-error`).textContent = message;
}

function validate() {
  email.value = email.value.trim();
  setError(nameInput, registering && nameInput.value.trim().length < 2 ? 'Informe um nome com pelo menos 2 caracteres.' : '');
  setError(email, !email.value ? 'Informe seu e-mail.' : !email.validity.valid ? 'Informe um e-mail válido, como voce@exemplo.com.' : '');
  setError(password, !password.value ? 'Informe sua senha.' : password.value.length < 8 || password.value.length > 128 ? 'A senha deve ter de 8 a 128 caracteres.' : !password.value.trim() ? 'A senha não pode conter apenas espaços.' : '');
  const invalid = form.querySelector('[aria-invalid="true"]');
  if (invalid) invalid.focus();
  return !invalid;
}

[nameInput, email, password].forEach(input => input.addEventListener('input', () => {
  setError(input, '');
  if (!busy) status.textContent = '';
}));

function updateButton() {
  submitLabel.textContent = buttonText.value.trim() || (registering ? 'GRAVAR MINHA FITA' : 'DAR O PLAY');
}

function cancelPending() {
  clearTimeout(timer);
  busy = false;
  submitButton.disabled = false;
  form.removeAttribute('aria-busy');
  form.querySelectorAll('input').forEach(input => { input.disabled = input === nameInput && !registering; });
  showPassword.disabled = false;
  updateButton();
}

function concealPassword() {
  password.type = 'password';
  showPassword.setAttribute('aria-label', 'Mostrar senha');
  showPassword.setAttribute('aria-pressed', 'false');
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (busy) return;
  status.textContent = '';
  if (!validate()) return;
  syncRememberedEmail();
  busy = true;
  submitButton.disabled = true;
  form.setAttribute('aria-busy', 'true');
  form.querySelectorAll('input').forEach(input => { input.disabled = true; });
  showPassword.disabled = true;
  submitLabel.textContent = 'SINTONIZANDO...';
  status.textContent = 'Simulando o acesso…';

  // Apenas simulação de interface: não faz requisições nem autentica usuários.
  timer = setTimeout(() => {
    cancelPending();
    password.value = '';
    concealPassword();
    status.textContent = registering
      ? 'Fita pronta! Os campos passaram pela validação. Esta demonstração não cria nem armazena uma conta.'
      : 'Sinal recebido! Os campos passaram pela validação. Esta demonstração não verifica credenciais nem inicia uma sessão.';
  }, 800);
});

showPassword.addEventListener('click', () => {
  const visible = password.type === 'password';
  password.type = visible ? 'text' : 'password';
  showPassword.setAttribute('aria-label', visible ? 'Ocultar senha' : 'Mostrar senha');
  showPassword.setAttribute('aria-pressed', String(visible));
});

modeSwitch.addEventListener('click', event => {
  event.preventDefault();
  registering = !registering;
  cancelPending();
  document.querySelector('.register-only').hidden = !registering;
  nameInput.disabled = !registering;
  nameInput.required = registering;
  password.autocomplete = registering ? 'new-password' : 'current-password';
  password.value = '';
  concealPassword();
  document.querySelector('#form-title').textContent = registering ? 'Grave sua história.' : 'Entre na fita.';
  document.querySelector('#form-description').textContent = registering ? 'Toda boa história começa com um primeiro play.' : 'Sua frequência. Seu espaço. Dê o play.';
  document.querySelector('.panel-index').textContent = registering ? '[ 02—02 ]' : '[ 01—02 ]';
  document.querySelector('#switch-description').textContent = registering ? 'Já tem a sua fita?' : 'Ainda não faz parte da fita?';
  modeSwitch.textContent = registering ? 'Voltar ao login ↗' : 'Crie sua conta ↗';
  modeSwitch.setAttribute('href', registering ? '#login' : '#cadastro');
  document.querySelector('#forgot-password').hidden = registering;
  buttonText.placeholder = registering ? 'GRAVAR MINHA FITA' : 'DAR O PLAY';
  [nameInput, email, password].forEach(input => setError(input, ''));
  status.textContent = '';
  updateButton();
  (registering ? nameInput : email).focus();
});

document.querySelector('#forgot-password').addEventListener('click', () => {
  status.textContent = 'Recuperação indisponível nesta demo. Em um serviço real, você receberia as instruções por e-mail, se houvesse uma conta associada.';
});

const palettes = {
  red: ['#e92b43', '#ffffff', 'rgba(233,43,67,.24)'],
  wine: ['#aa2946', '#ffffff', 'rgba(170,41,70,.24)'],
  bone: ['#ead9d5', '#241218', 'rgba(234,217,213,.12)']
};
document.querySelectorAll('.swatch').forEach(swatch => swatch.addEventListener('click', () => {
  const [background, text, glow] = palettes[swatch.dataset.color];
  document.documentElement.style.setProperty('--button', background);
  document.documentElement.style.setProperty('--button-text', text);
  document.documentElement.style.setProperty('--button-glow', glow);
  document.querySelectorAll('.swatch').forEach(button => button.setAttribute('aria-pressed', String(button === swatch)));
  document.querySelector('#custom-status').textContent = `Cor selecionada: ${swatch.getAttribute('aria-label')}.`;
}));
buttonText.addEventListener('input', () => { if (!busy) updateButton(); });

function setEffects(enabled) {
  document.body.classList.toggle('effects-off', !enabled);
  effectsToggle.setAttribute('aria-pressed', String(enabled));
  document.querySelector('#effects-label').textContent = enabled ? 'Ligado' : 'Desligado';
}
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
setEffects(!reducedMotion.matches);
reducedMotion.addEventListener('change', event => setEffects(!event.matches));
effectsToggle.addEventListener('click', () => setEffects(effectsToggle.getAttribute('aria-pressed') !== 'true'));
document.querySelector('#year').textContent = String(new Date().getFullYear());
