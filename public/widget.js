/*!
 * Pequi · widget de atendimento white-label
 * Uso (gerado no admin do Pequi):
 *   <script src="https://pequi.me/widget.js" data-key="pk_wl_..." data-api="https://api.pequi.me/api" async></script>
 *
 * O botão abre um iframe com o chat do escritório. Só funciona nos sites cadastrados
 * para a chave: a API recusa outras origens e o iframe só pode ser embutido por elas.
 */
(function () {
  'use strict';
  if (window.__pequiWidgetLoaded) return;
  window.__pequiWidgetLoaded = true;

  var script =
    document.currentScript ||
    document.querySelector('script[src*="widget.js"][data-key]');
  if (!script) return;

  var key = script.getAttribute('data-key') || '';
  var api = (script.getAttribute('data-api') || '').replace(/\/$/, '');
  var base = new URL(script.src, window.location.href).origin;
  if (!key || !api) {
    console.warn('[Pequi] widget sem data-key ou data-api.');
    return;
  }

  var state = { open: false, frame: null, panel: null, button: null, tenant: null };

  fetch(api + '/widget/config?key=' + encodeURIComponent(key), { credentials: 'omit' })
    .then(function (r) {
      if (!r.ok) throw new Error(r.status === 403 ? 'este site não está autorizado para esta chave' : 'HTTP ' + r.status);
      return r.json();
    })
    .then(function (cfg) {
      state.tenant = cfg.tenant;
      mount(cfg.tenant);
    })
    .catch(function (e) {
      console.warn('[Pequi] widget não carregado: ' + e.message);
    });

  function css(el, styles) {
    for (var k in styles) el.style[k] = styles[k];
  }

  function mount(t) {
    var side = t.widgetPosition === 'left' ? 'left' : 'right';
    var color = /^#[0-9a-fA-F]{6}$/.test(t.primaryColor) ? t.primaryColor : '#FA5A50';

    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Abrir o atendimento de ' + t.name);
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML =
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>';
    css(button, {
      position: 'fixed', bottom: '20px', zIndex: '2147483646', width: '60px', height: '60px',
      borderRadius: '50%', border: 'none', cursor: 'pointer', background: color, color: '#fff',
      boxShadow: '0 10px 30px -8px rgba(0,0,0,.35)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', transition: 'transform .15s ease',
    });
    button.style[side] = '20px';
    button.onmouseenter = function () { button.style.transform = 'scale(1.06)'; };
    button.onmouseleave = function () { button.style.transform = 'scale(1)'; };
    button.onclick = toggle;

    var panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Atendimento de ' + t.name);
    css(panel, {
      position: 'fixed', bottom: '92px', zIndex: '2147483647', width: '380px', height: '600px',
      maxWidth: 'calc(100vw - 24px)', maxHeight: 'calc(100vh - 112px)', borderRadius: '18px',
      overflow: 'hidden', boxShadow: '0 24px 60px -12px rgba(0,0,0,.35)', background: '#fff',
      display: 'none',
    });
    panel.style[side] = '20px';

    document.body.appendChild(panel);
    document.body.appendChild(button);
    state.button = button;
    state.panel = panel;

    window.addEventListener('message', function (ev) {
      if (ev.origin !== base || !ev.data || typeof ev.data !== 'object') return;
      if (ev.data.type === 'pequi:close') setOpen(false);
    });
  }

  function toggle() {
    setOpen(!state.open);
  }

  function setOpen(open) {
    state.open = open;
    if (open && !state.frame) {
      var f = document.createElement('iframe');
      f.title = 'Atendimento de ' + state.tenant.name;
      f.src = base + '/embed/chat?key=' + encodeURIComponent(key) + '&origin=' + encodeURIComponent(window.location.origin);
      f.allow = 'clipboard-write';
      css(f, { width: '100%', height: '100%', border: '0', display: 'block' });
      state.panel.appendChild(f);
      state.frame = f;
    }
    state.panel.style.display = open ? 'block' : 'none';
    state.button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // API pública mínima para o site do escritório: PequiWidget.open() / .close()
  window.PequiWidget = {
    open: function () { if (state.panel) setOpen(true); },
    close: function () { if (state.panel) setOpen(false); },
  };
})();
