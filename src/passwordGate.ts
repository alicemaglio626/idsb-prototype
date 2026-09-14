// Password gate for the deployed prototype. Reconstructed from the
// currently-deployed bundle — this file was never committed to git (see
// idsb-prototype-deployment memory). Runs before React mounts, using plain
// DOM so the gate still holds even if the app bundle fails to load/render.
//
// Not real security — just keeps the prototype off search engines / casual
// stumbling. The password is intentionally visible in this source file.

const PASSWORD = 'idsb';
const AUTH_KEY = 'idsb_proto_auth';

export function initApp(renderApp: () => void): void {
    if (sessionStorage.getItem(AUTH_KEY)) {
        renderApp();
    } else {
        renderGate(renderApp);
    }
}

function renderGate(renderApp: () => void): void {
    const root = document.getElementById('root')!;
    root.innerHTML = `
    <div style="
      display:flex;align-items:center;justify-content:center;
      height:100vh;background:#f8f9fa;font-family:DM Sans,sans-serif;
    ">
      <div style="
        background:#fff;border-radius:8px;padding:40px 48px;
        box-shadow:0 2px 16px rgba(0,0,0,0.10);width:320px;text-align:center;
      ">
        <img src="${import.meta.env.BASE_URL}favicon-cyan.png" style="width:36px;margin-bottom:16px;" />
        <div style="font-weight:600;font-size:16px;margin-bottom:4px;color:#1a1a1a;">Datavant Portal</div>
        <div style="font-size:13px;color:#6b7280;margin-bottom:24px;">IDSB Prototype · Enter password to continue</div>
        <input
          id="idsb-pw"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          style="
            width:100%;box-sizing:border-box;border:1px solid #d1d5db;
            border-radius:6px;padding:10px 12px;font-size:14px;
            outline:none;margin-bottom:8px;
          "
        />
        <div id="idsb-err" style="color:#dc2626;font-size:13px;min-height:18px;margin-bottom:8px;"></div>
        <button
          id="idsb-btn"
          style="
            width:100%;background:#0066cc;color:#fff;border:none;
            border-radius:6px;padding:10px;font-size:14px;font-weight:600;
            cursor:pointer;
          "
        >Enter</button>
      </div>
    </div>
  `;

    const input = document.getElementById('idsb-pw') as HTMLInputElement;
    const button = document.getElementById('idsb-btn')!;
    const errorEl = document.getElementById('idsb-err')!;

    const submit = (): void => {
        if (input.value === PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, '1');
            root.innerHTML = '';
            renderApp();
        } else {
            errorEl.textContent = 'Incorrect password.';
            input.focus();
        }
    };

    button.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submit();
    });
    input.focus();
}
