export type Relationship = "Partner" | "Customer";

export interface Contact {
  id: number;
  company: string;
  contact: string;
  email: string;
  relationship: Relationship;
  primary: boolean;
}
