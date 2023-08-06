import { DataTableProps } from "../../types";
import "./dataTable.css";

export const DataTable = ({
  headerKeys,
  filteredData,
  tickedItems,
  onCheckboxChange,
  disabledItems,
  editMode,
}: DataTableProps) => {
  return (
    <table className=" mx-auto sessionTable-admin ">
      <thead>
        <tr>
          {headerKeys.map((key, index) => (
            <th key={index} className="border-4 p-2 px-4 py-2">
              {key}
            </th>
          ))}
          <th className="border border-gray-200 p-2 md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Name
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Location
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Lot
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Quantity
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Scanning Quantity
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Scan lot
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Operator
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Assign
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Status
          </th>
          <th className="border border-gray-200 p-2  md:p-1 text-xs md:text-sm lg:text-xl text-center ">
            Variant
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, index) => (
          <tr key={index} className="">
            {Object.values(row).map((value, rowIndex) => (
              <td key={rowIndex} className="text-center p-5">
                {typeof value === "object" && value !== null
                  ? `${value.id} - ${value.name} - ${value.createdAt}`
                  : value}
              </td>
            ))}
            <td className="">
              <input
                type="checkbox"
                checked={
                  tickedItems.has(index) || (!!row.Operator && !editMode)
                }
                onChange={(e) => onCheckboxChange(e, index)}
                disabled={
                  !!((disabledItems.has(index) || row.Operator) && !editMode)
                }
              />
            </td>
            <td className="">
              {row.Qty_System === row.Qty_Scanned &&
              parseInt(row.IntelLot) === row.Scan_Lot
                ? "Đúng"
                : row.Qty_Scanned === ""
                ? "Chưa Scan"
                : row.Qty_System !== row.Qty_Scanned &&
                  parseInt(row.IntelLot) === row.Scan_Lot
                ? "Sai Số Lượng"
                : row.Qty_System === row.Qty_Scanned &&
                  parseInt(row.IntelLot) !== row.Scan_Lot
                ? "Sai Lot"
                : "Sai Số Lượng & Sai Lot"}
            </td>
            <td className="">
              {typeof row.Qty_Scanned === "number" &&
              typeof row.Qty_System === "number"
                ? row.Qty_Scanned - row.Qty_System
                : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
