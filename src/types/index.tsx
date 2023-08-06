import { MouseEventHandler } from "react";

export interface OriginalData {
  // "Intel Lot": number | string;
  "Intel Lot": string;
  "Item ID": string;
  Location: string;
  // "Qty System": number | string;
  "Qty System": number;
  "Qty Scanned": number | string | null | undefined;
  Scan_Lot: number | string | null | undefined;
  createdAt: string;
  id: string;
  operatorStock: null;
  user: {
    id: string;
    username: string;
    password: string;
    role: string;
  };
}

export interface DataRow {
  ItemID: string;
  Location: string;
  // IntelLot: number | string;
  IntelLot: string;
  Qty_System: number;
  Qty_Scanned: number | undefined | null | string;
  Scan_Lot?: number | string | undefined | null;
  Operator: string | null;
}

// Role can have one of four values: "Admin", "Supervisor", "Operator", or an empty string.
export type Role = "Admin" | "Supervisor" | "Operator" | "";

export type LoginUser = {
  username: string;
  password: string;
  id: string;
  session: [];
  role: string;
  jwt_token?: string;
};

export interface RoleResponse {
  data: LoginUser; // The role value returned from an API response
  error: string | null; // Any error message associated with the role response
}

export type LoginJWT = {
  data: string;
};

export type UserState = {
  username: string; // The user's username
  password: string; // The user's password
  role: Role; // The user's role
  jwtToken?: string; //user keep a jwt for any request
  setUsername: (username: string) => void; // Function to set the username
  setPassword: (password: string) => void; // Function to set the password
  setRole: (role: Role) => void; // Function to set the role
  setJwtToken: (jwt_token: string) => void; //set the jwt of that user for any request they will make
};

export interface User {
  id: number; // The user's unique identifier
  name: string; // The user's name
}

export interface DataTableProps {
  headerKeys: string[]; // An array of keys representing the table header
  filteredData: DataRow[]; // An array of data rows to be displayed in the table
  tickedItems: Set<number>; // A set of item IDs that are selected in the table
  // operator: string | null; // The name of the operator associated with the table
  onCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void; // Callback function invoked when a checkbox is changed in the table
  disabledItems: Set<number>; // A set of item IDs that are disabled in the table
  editMode: boolean; // Whether the table is in edit mode
}

// Define the shape of the search parameters object
export type SearchParams = {
  sessionName: string | null;
};

export interface CustomButtonProps {
  onClick: MouseEventHandler;
  buttonText: string;
}

export interface CustomAnotherButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  onClick: MouseEventHandler;
  buttonText: string;
  className: string;
}

export type ReponseStatus = 200 | 400 | 401 | 404 | 500;

interface Session {
  createdAt: string;
  id: string;
  name: string;
}

export interface Operator {
  id: string;
  password: string;
  role: string;
  sessions: Session[];
  username: string;
}

export interface UpdatedStocks {
  createdAt: string;
  id: string;
  itemId: string;
  location: string;
  lot: string;
  quantity: number;
  scan_quantity: number;
  scan_lot: number;
  session: Session;
  user: Operator;
}
