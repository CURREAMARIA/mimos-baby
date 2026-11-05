// Conexión con Supabase (no hace falta tocar este archivo)
(function () {
  const C = window.MIMOS_CONFIG || {};
  const URL = (C.SUPABASE_URL || "").replace(/\/$/, "");
  const KEY = C.SUPABASE_ANON_KEY || "";
  const SKEY = "mimos_sesion";

  const configured = () => /^https:\/\//.test(URL) && KEY.length > 20;

  function getSession() {
    try { return JSON.parse(localStorage.getItem(SKEY) || "null"); } catch (e) { return null; }
  }
  function setSession(s) {
    try { s ? localStorage.setItem(SKEY, JSON.stringify(s)) : localStorage.removeItem(SKEY); } catch (e) {}
  }

  async function authCall(grant, body) {
    const r = await fetch(`${URL}/auth/v1/token?grant_type=${grant}`, {
      method: "POST",
      headers: { apikey: KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error_description || j.msg || j.message || "No se pudo iniciar sesión");
    const s = { access_token: j.access_token, refresh_token: j.refresh_token,
                expires_at: Date.now() + (j.expires_in || 3600) * 1000, email: j.user && j.user.email };
    setSession(s);
    return s;
  }

  async function token() {
    let s = getSession();
    if (!s) return null;
    if (Date.now() > s.expires_at - 60000) {
      try { s = await authCall("refresh_token", { refresh_token: s.refresh_token }); }
      catch (e) { setSession(null); return null; }
    }
    return s.access_token;
  }

  async function rest(path, opts = {}) {
    const t = opts.auth ? await token() : null;
      const headers = { apikey: KEY, "Content-Type": "application/json" };
    if (t) headers.Authorization = `Bearer ${t}`;
    else if (!KEY.startsWith("sb_")) headers.Authorization = `Bearer ${KEY}`;
    if (opts.prefer) headers.Prefer = opts.prefer;
    const r = await fetch(`${URL}/rest/v1/${path}`, {
      method: opts.method || "GET", headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      throw new Error(j.message || `Error ${r.status}`);
    }
    if (r.status === 204) return null;
    const txt = await r.text();
    return txt ? JSON.parse(txt) : null;
  }

  async function upload(blob, name) {
    const t = await token();
    const path = `${Date.now()}-${name}`.replace(/[^a-zA-Z0-9._-]/g, "_");
    const r = await fetch(`${URL}/storage/v1/object/productos/${path}`, {
      method: "POST",
      headers: { apikey: KEY, Authorization: `Bearer ${t}`, "Content-Type": blob.type || "image/jpeg", "x-upsert": "true" },
      body: blob
    });
    if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error(j.message || "No se pudo subir la foto"); }
    return `${URL}/storage/v1/object/public/productos/${path}`;
  }

  window.MIMOS_API = {
    configured, rest, upload, token,
    login: (email, password) => authCall("password", { email, password }),
    logout: () => setSession(null),
    session: getSession
  };
})();
