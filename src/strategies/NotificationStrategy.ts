export interface NotificationStrategy {
  send(receiver: string, message: NotificationType): Promise<void>;
}

export type NotificationType = "welcome" | "reminder";
