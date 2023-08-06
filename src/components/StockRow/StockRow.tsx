import { DataRow } from "../../types";
import StockDialog from "../StockDialog/StockDialog";

const StockRow = ({ stock }: { stock: DataRow }) => (
  <tr key={stock.ItemID}>
    <td className="border border-gray-200 p-2 flex justify-center">
      <StockDialog location={stock.Location} />
    </td>
    <td className="text-xs md:text-xl lg:text-2xl">{stock.ItemID}</td>
    <td className="text-xs md:text-xl lg:text-2xl">{stock.IntelLot}</td>
  </tr>
);

export default StockRow;
