import { Connection, Container, ReceiverEvents } from "rhea-promise";
import nodemailer from "nodemailer";

// Configuración de conexión a ActiveMQ
const container = new Container();
const connection = new Connection({
  container_id: container.id,
  transport: "tcp",
  host: process.env.ACTIVEMQ_HOST || "activemq",
  port: parseInt(process.env.ACTIVEMQ_PORT || "5672"),
  username: process.env.ACTIVEMQ_USER || "admin",
  password: process.env.ACTIVEMQ_PASSWORD || "admin",
});

const queueName = "emailQueue";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.MAIL_PORT || "587"),
  auth: {
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
  },
});

async function sendTestEmail(to: string) {
  const info = await transporter.sendMail({
    from: '"Patient API" <noreply@patientapi.com>',
    to,
    subject: "Bienvenido",
    text: "Hola! Este es un email de bienvenida.",
  });

  console.log("Email enviado:", info.messageId);
}

async function startConsumer() {
  try {
    await connection.open();

    const receiver = await connection.createReceiver({
      source: {
        address: queueName,
      },
    });

    console.log(`Escuchando mensajes en la cola: "${queueName}"`);

    receiver.on(ReceiverEvents.message, async (context) => {
      const msg = context.message?.body;
      const email = msg?.email;

      if (!email) {
        console.warn("Mensaje sin email:", msg);
        return;
      }

      console.log("Mensaje recibido:", msg);

      try {
        await sendTestEmail(email);
      } catch (err) {
        console.error("Error al enviar el email:", err);
      }
    });
  } catch (err) {
    console.error("Error iniciando el consumer:", err);
  }
}

startConsumer();
