export interface ISupportTicket {
  _id: string; // Unique identifier
  createdAt: string; // ISO date string for creation time
  description: string; // Description of the item
  handlers: string[]; // Array of handler identifiers (if applicable)
  holderId: string; // Identifier for the holder
  messages: string[]; // Array of associated messages (if any)
  otherDetails: string; // Additional details
  reason: string; // Reason for the current status
  status: "pending" | "approved" | "rejected"; // Status with possible values
  title: string; // Title of the item
  updatedAt: string; // ISO date string for last update
}