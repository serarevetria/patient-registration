import { EmailNotification } from "../strategies/EmailNotification";
import {
  NotificationStrategy,
  NotificationType,
} from "../strategies/NotificationStrategy";

export class NotificationService {
  private strategies: Map<string, NotificationStrategy>;

  constructor() {
    this.strategies = new Map();
    this.strategies.set("email", new EmailNotification());
  }

  async sendNotifications(
    recipients: Recipients,
    messageType: NotificationType
  ) {
    if (recipients.email) {
      const emailStrategy = this.strategies.get("email");
      if (emailStrategy) {
        await emailStrategy.send(recipients.email, messageType);
      }
    }
  }
}

type Recipients = {
  email?: string;
};
