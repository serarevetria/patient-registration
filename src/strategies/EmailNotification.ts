import { NotificationStrategy, NotificationType } from "./NotificationStrategy";
import { Connection, Container } from "rhea-promise";

export class EmailNotification implements NotificationStrategy {
  private connection: Connection;
  private readonly queue: string = "emailQueue";

  constructor() {
    const container = new Container();
    this.connection = new Connection({
      container_id: container.id,
      transport: "tcp",
      host: process.env.ACTIVEMQ_HOST || "activemq",
      port: parseInt(process.env.ACTIVEMQ_PORT || "5672"),
      username: process.env.ACTIVEMQ_USER || "admin",
      password: process.env.ACTIVEMQ_PASSWORD || "admin",
    });
  }

  async send(email: string, messageType: NotificationType): Promise<void> {
    try {
      await this.connection.open();

      const sender = await this.connection.createSender({
        target: {
          address: this.queue,
        },
      });

      const message = {
        body: {
          email,
          messageType,
          timestamp: new Date().toISOString(),
        },
      };

      await sender.send(message);

      await sender.close();
      await this.connection.close();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}
