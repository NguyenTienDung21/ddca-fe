import { DataRow, OriginalData } from "../types";

export function transformDataRowToObject(dataRow: DataRow): OriginalData {
  return {
    "Item ID": dataRow.ItemID,
    Location: dataRow.Location,
    "Intel Lot": dataRow.IntelLot,
    "Qty System": dataRow.Qty_System,
    "Qty Scanned": dataRow.Qty_Scanned,
    Scan_Lot: dataRow.Scan_Lot,
    createdAt: "",
    id: "",
    operatorStock: null,
    user: {
      id: "",
      username: dataRow.Operator ? dataRow.Operator : "",
      password: "",
      role: "",
    },
  };
}
