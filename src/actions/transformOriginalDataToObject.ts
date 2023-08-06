import { DataRow, OriginalData } from "../types";

export function transformOriginalDataToObject(
  originalData: OriginalData
): DataRow {
  return {
    ItemID: originalData["Item ID"],
    Location: originalData.Location,
    IntelLot: originalData["Intel Lot"],
    Qty_System: originalData["Qty System"],
    Qty_Scanned: originalData["Qty Scanned"],
    Scan_Lot: originalData.Scan_Lot,
    Operator: originalData.user ? originalData.user.username : "",
  };
}
