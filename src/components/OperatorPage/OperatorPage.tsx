import { useLocation } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useUserStore } from "../../hooks/useUserStore";
import { getSearchParams } from "../../actions/getSearchParams";
import { useStocks } from "../../hooks/useStocks";
import { CustomOtherButton } from "../Button/CustomButton";
import { useState } from "react";
import "./operator.css";
import "../MyStyleComponents/my-styles.css";
import toast from "react-hot-toast";
import UserGuard from "../UserGuard/UserGuard";
import { OriginalData } from "../../types";
import { API_OS } from "../../utils";

export const OperatorPage = () => {
  const operatorName = useUserStore((state) => state.username);
  const { sessionName } = getSearchParams(useLocation().search);
  const userJWTString = useUserStore((state) => state.jwtToken);
  const [stockLot, setStockLot] = useState("");

  //Temporary data container for location, itemId, lot and quantity
  const [tempLocationData, setTempLocationData] = useState("");
  const [tempItemIdData, setTempItemIdData] = useState("");
  const [tempLotData, setTempLotData] = useState("");
  const [tempQuantityData, setTempQuantityData] = useState(0);

  //values used for comparison
  const [correctLocation, setCorrectLocation] = useState("");
  const [correctItemId, setCorrectItemId] = useState("");
  const [correctLot, setCorrectLot] = useState("");

  //Input field disabled status
  const [isItemIdDisabled, setItemIdDisabled] = useState(true);
  const [isLotDisabled, setLotDisabled] = useState(true);

  //list for tracking if the operator forgot any stock, this will be compared with the "stocks"  when pressing confirm button
  //this list contain the itemId only
  const [trackList,setTrackList] = useState<OriginalData[]>([]);


  const saveCorrectData = (location: string, itemId: string, lot: string) => {
    setCorrectLocation(location);
    setCorrectItemId(itemId);
    setCorrectLot(lot);
  };

  const clearCorrectData = () => {
    setCorrectLocation("");
    setCorrectItemId("");
    setCorrectLot("");
  };

  //When clicking save changes, we must disable input field again for other stock in the list
  const disableInputsFieldBackAgain = () => {
    setItemIdDisabled(true);
    setLotDisabled(true);
  };

  //Check if the location is correct
  const validateCorrectLocation = (location: string) => {
    //Compare between the temp data with the correct data of location
    if (correctLocation === location) {
      //Stop disabling the itemId input field
      console.log("value is correct");
      //Save value
      setTempLocationData(location);
      //Stop disabling the itemId input field
      //(document.getElementById("itemID") as HTMLInputElement).disabled = false;
      setItemIdDisabled(false);
    } else {
      toast.error("Location is not correct", {
        duration: 800,
      });
    }
  };

  const validateCorrectItemIdAndLot = (secondScan: string) => {
    //2 Types of input, if scanning then the string length will be 32

    //if we detect string that is less than 32, meaning that the user is typing mannually
    const stringLength = secondScan.length;


    //Mannual input
    if (stringLength < 32) {
      console.log("mannual input detected");

      if (secondScan.length === 9) {
        if (secondScan === correctItemId) {

          //Trim the data before saving
          secondScan = secondScan.trim();

          //Save the itemId
          setTempItemIdData(secondScan);
          //Stop disabling the lot input
          setLotDisabled(false);
        }
        else {
          toast.error("itemId is not correct", {
            duration: 800,
          });
        }
      }

      return;
    }

    //Barcode input
    if (stringLength === 32) {
      console.log("barcode scan detected");
      //Extract itemId String from barcode
      const itemId = secondScan.substring(0, 9);

      //Lot
      let lot = "";
      //Split the remaining right string after itemId
      const handleLotString = secondScan.substring(9, 32);
      setStockLot(handleLotString);

      //Check if there is lot value exist
      for (let i = 0; i < handleLotString.length; i++) {
        if (handleLotString[i] !== "0") {
          //Take the string and break the loop
          lot = handleLotString.substring(i, i + 5);
          break;
        }
      }

      //if lot value is not found, it will be a default "0"
      if (lot === "") {
        lot = "0";
      }

      //Comparison
      //If correct
      if (itemId === correctItemId) {
        //Save the itemId
        setTempItemIdData(itemId);

        //Save the lot, if the value is not exist, then it is an empty string
        setTempLotData(lot);
        //Stop disabling the lot input
        setLotDisabled(false);

        //Compare lot value
        if (lot === correctLot) {
          console.log("lot is correct");
        }

        //Set the value
        (document.getElementById("itemID") as HTMLInputElement).value = itemId;
        (document.getElementById("lot") as HTMLInputElement).value = lot;
      } else {
        toast.error("itemId is not correct", {
          duration: 800,
        });
      }
    }
  };

    // //List for comparison with the 
    // const displayValue = () => {
    //   console.log("tempLocation: " + tempLocationData);
    //   console.log("tempItemId: " + tempItemIdData);
    //   console.log("tempLot: " + tempLotData);
    //   console.log("tempQuantity: " + tempQuantityData);
    // };

    // const displayOperatorTrackList = () => {
    //   console.log(trackList);
    // }

  const checkTrackList = (temporaryWorkingStock: OriginalData) => {
    //Loop through the list and check for that itemId
    for(let i = 0 ; i < trackList.length; i++){
      //If we found the existed location, we continue to compare the item id and lot, to avoid worst case that some stock have same location and itemId
      if(trackList[i].Location === temporaryWorkingStock.Location){
        if(trackList[i]["Item ID"] === temporaryWorkingStock["Item ID"]){
          if(trackList[i].Scan_Lot === temporaryWorkingStock.Scan_Lot){
            //update quantity
            trackList[i]["Qty Scanned"] = temporaryWorkingStock["Qty Scanned"];
            return;
          }
        }
      }
    } 
    //Since we don't find any existed name, we add a new location into the list for tracking
    setTrackList(trackList => [...trackList,temporaryWorkingStock]); 
  }


  const {
    data: stocks,
    isLoading,
    error,
  } = useStocks(sessionName || "", operatorName);
  //const data: DataRow[] = stocks? stocks.map(transformOriginalDataToObject): [];

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error: {error.message}</div>;

  const clearTemporaryValue = () => {
    setTempLocationData("");
    setTempItemIdData("");
    setTempLotData("");
    setTempQuantityData(0);
  };

  const updateData = async () => {
    console.log(stocks);

    //Check if the user forgot any stock by compare value of the saved changes stocks with the original stock list
    if(trackList.length !== stocks?.length){
      toast.error("You forgot some stock, check again", {
        duration: 800,
      });
      return;
    }

    //If all stocks have been scanned, we allow them to send data
    //"http://localhost:8081/assign"
    try {
      await axios.post(API_OS.addStocksOperator, stocks, {
        params: {
          operatorName: operatorName,
          sessionName: encodeURIComponent(sessionName as string),
        },
        headers: {
          Authorization: `Bearer ${userJWTString}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      toast.success("Send stock completed", {
        duration: 800,
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-blue-100 container_sessionTable">
      <p className="menu-title">Operator menu</p>
      <table className=" sessionTable">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 text-xs md:text-xl lg:text-2xl text-center">
              Stock Location
            </th>
            <th className="border border-gray-200 p-2 text-xs md:text-xl lg:text-2xl text-center">
              ItemId
            </th>
            <th className="border border-gray-200 p-2 text-xs md:text-xl lg:text-2xl text-center">
              Intel Lot
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks?.length == 0 ? (
            <tr>
              <td colSpan={3} style={{ padding: "20px" }} className="subtext">
                table is empty
              </td>
            </tr>
          ) : (
            stocks?.map((stock) => (
              <tr key={stock["Item ID"]}>
                <td className="border border-gray-200 p-2">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        onClick={() => {
                          clearTemporaryValue();
                          saveCorrectData(
                            stock.Location,
                            stock["Item ID"],
                            stock["Intel Lot"]
                          );
                        }}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold 
              border border-gray-400 rounded shadow text-xs md:text-xl lg:text-2xl button-style">
                        {stock.Location}
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                          Stock Profile
                        </Dialog.Title>
                        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                          {stockLot === "" ? "" : stockLot}
                        </Dialog.Description>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label
                            className="text-violet11 w-[90px] text-right text-[15px]"
                            htmlFor="name">
                            Location
                          </label>
                          <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="name"
                            placeholder="Location"
                            onChange={(e) => {
                              //Check for correct location
                              validateCorrectLocation(e.target.value);
                            }}
                          />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label
                            className="text-violet11 w-[90px] text-right text-[15px]"
                            htmlFor="name">
                            Item ID
                          </label>
                          <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="itemID"
                            placeholder="Item ID"
                            disabled={isItemIdDisabled}
                            onChange={(e) => {
                              validateCorrectItemIdAndLot(e.target.value);
                            }}
                          />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label
                            className="text-violet11 w-[90px] text-right text-[15px]"
                            htmlFor="name">
                            Lot
                          </label>
                          <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="lot"
                            placeholder="Lot"
                            disabled={isLotDisabled}
                            onChange={(e) => {
                              setTempLotData(e.target.value);
                            }}
                          />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label
                            className="text-violet11 w-[90px] text-right text-[15px]"
                            htmlFor="name">
                            Quantity
                          </label>
                          <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="quantity"
                            placeholder="0"
                            type="number"
                            onChange={(e) => {
                              setTempQuantityData(Number(e.target.value));
                            }}
                          />
                        </fieldset>                       
                        <div className="mt-[25px] flex justify-end">
                          <Dialog.Close asChild>
                            <button
                              className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                              onClick={() => {
                                if(tempLocationData === "" || tempItemIdData === "" || tempLotData === ""){
                                  toast.error("please fill in all field", {
                                    duration: 800,
                                  });
                                }
                                else {
                                  stock.Location = tempLocationData;
                                  stock["Item ID"] = tempItemIdData;
                                  stock["Qty Scanned"] = tempQuantityData;
                                  stock.Scan_Lot = parseInt(tempLotData);
                                  //Check if the trackList exist any value similar
                                  checkTrackList(stock);
                                  disableInputsFieldBackAgain();
                                }
                              }}>
                              Save changes
                            </button>
                          </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                          <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                            onClick={() => {
                              clearCorrectData();
                              clearTemporaryValue();
                              disableInputsFieldBackAgain();
                            }}>
                            ❌
                          </button>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </td>
                <td className="text-xs md:text-xl lg:text-2xl">
                  {stock["Item ID"]}
                </td>
                <td className="text-xs md:text-xl lg:text-2xl">
                  {stock["Intel Lot"]}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <CustomOtherButton
        type="button"
        onClick={updateData}
        buttonText="Confirm"
        className={"button-style-confirm"}
      />
      <UserGuard />
    </div>
  );
};
