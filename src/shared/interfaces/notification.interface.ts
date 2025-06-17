export interface INotification {
  notificationText: string;
  userId: string;
  notificationType: "individual" | "general";
  redirectScreen: string;
  status: "active" | "disabled";
}
