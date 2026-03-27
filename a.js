fetch('/')
  .then(response => response.text())
  .then(data => alert("Contenido de flag.txt: " + data))
  .catch(err => alert("Error al leer el archivo (posiblemente bloqueado por CSP o no existe)"));