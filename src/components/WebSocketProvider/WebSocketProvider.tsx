import React, { useEffect, useState } from "react";
import { DataContext } from "../DataContext/DataContext";
import { DataRow } from "../../types";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [stocks, setStocks] = useState<DataRow[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081/websocket");
    ws.onmessage = (event) => {
      const updatedStocks = JSON.parse(event.data);
      setStocks(updatedStocks);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <DataContext.Provider value={{ stocks, setStocks }}>
      {children}
    </DataContext.Provider>
  );
};
