// Diagnóstico simple
console.log("--- SCRIPT XSS CARGADO ---");

// Intentamos enviar un 'ping' al webhook
fetch('https://tu-webhook.com/debug?status=funciona')
  .then(() => console.log("Petición enviada al webhook"))
  .catch((err) => console.error("Error al contactar el webhook:", err));

// También un alert para confirmar ejecución visual
alert("Script ejecutado. Revisa tu webhook.");