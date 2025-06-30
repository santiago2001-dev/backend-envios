const { Client, LocalAuth } = require("whatsapp-web.js");
const storage = require('node-persist');

// Inicializa el almacenamiento persistente
async function initStorage() {
  await storage.init({
    dir: 'sessionStorage',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: true,  // Habilita el logging
    ttl: false      // Deshabilita el TTL (Time to Live)
  });
}

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "sessions",
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
  },
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

let session = {
  message: "Iniciando...",
  status: false,
};

// Función para actualizar el estado de la sesión y guardarlo en el almacenamiento
async function updateSession(newSession) {
  session = newSession;
  await storage.setItem('session', session);
}

// Evento para generar el QR
client.on("qr", async (qr) => {
  client.qrCode = qr;
  await updateSession({
    message: "Sesión no iniciada, por favor escanear QR",
    status: false,
    qrData: qr,
  });
  console.log("QR Code generado, escanee para iniciar sesión.");
});

// Evento cuando el cliente está listo
client.on("ready", async () => {
  await updateSession({
    message: "Bot listo",
    status: true,
  });
  console.log("Client is ready!");
});

// Evento cuando se autentica
client.on("authenticated", async () => {
  await updateSession({
    message: "Bot autenticado",
    status: true,
  });
  console.log("Bot autenticado.");
});

// Evento cuando se desconecta
client.on("disconnected", async () => {
  await updateSession({
    message: "Se desconectó la sesión",
    status: false,
  });
  console.log("Sesión desconectada.");
});

// Evento de fallo de autenticación
client.on("auth_failure", async () => {
  await updateSession({
    message: "Error al conectarse",
    status: false,
  });
  console.error("Error de autenticación.");
});

// Inicializa el cliente de WhatsApp y el almacenamiento
(async () => {
  await initStorage();
  client.initialize().catch((err) => console.log(err));
})();


// Controlador para el login
const login = async (req, res) => {
  try {
      // Recupera el estado de la sesión desde el almacenamiento
      const storedSession = await storage.getItem('session');

      // Si la sesión está cerrada, informar al usuario que debe escanear el QR para iniciar sesión nuevamente
      if (!storedSession || !storedSession.status) {
          session = {
              message: "Sesión no iniciada, por favor escanear QR",
              status: false,
              qrData: client.qrCode, // Podrías necesitar regenerar el QR aquí si es necesario
          };
      } else {
          // Si la sesión está activa, mantén el estado actual
          session = storedSession;
      }

      res.status(200).json({ session });
  } catch (error) {
      res.status(500).json({
          message: "Failed to retrieve session status",
          error: error.message,
      });
  }
};


module.exports = {
  client,
  login,
};
