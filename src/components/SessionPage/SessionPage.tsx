import { Link } from "react-router-dom";
import { queryClient } from "../../utils";
import axios, { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { Session } from "../../hooks/useSessionStore";
import { useStockSize } from "../../hooks/useStockSize";
import { useUserStore } from "../../hooks/useUserStore";
import { deleteStockBySessionId } from "../../actions/deleteStockBySessionId";
import { deleteSession } from "../../actions/deleteSession";
import * as Dialog from "@radix-ui/react-dialog";
import "./sessionPage.css";
import "../MyStyleComponents/my-styles.css";

import { useState } from "react";
import UserGuard from "../UserGuard/UserGuard";

import { API_SESSION } from "../../utils";

const ViewSessions = () => {
  // State variables
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionName, setSessionName] = useState<string>();

  const stockSize = useStockSize(sessionName || "")((state) => state.stockSize); // Stock size from DataContext

  const username = useUserStore((state) => state.username);
  const userRole = useUserStore((state) => state.role);
  const userJWTString = useUserStore((state) => state.jwtToken);
  // Function to fetch sessions data
  const fetchSessions = async () => {
    console.log(username.includes("Operator"));

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${userJWTString}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    // Determine endpoint based on user role
    //"http://localhost:8081/sessions/all"
    const endpoint = API_SESSION.getAllSessions;
    const response = await axios.get<Session[]>(endpoint, config);
    return response.data;
  };

  // Use the useQuery hook to fetch and cache session data
  const { refetch } = useQuery("sessions", fetchSessions, {
    onSuccess: (sessionsData) => setSessions(sessionsData),
  });

  // Use the useMutation hook to handle stock deletion
  const deleteStockMutation = useMutation(deleteStockBySessionId, {
    onSuccess: () => {
      queryClient.invalidateQueries("stocks");
    },
    onError: (error: unknown) => {
      console.log("Error deleting stocks:", error);
    },
  });

  // Use the useMutation hook to handle session deletion
  const deleteSessionMutation = useMutation(deleteSession, {
    onSuccess: () => {
      queryClient.invalidateQueries("sessions");
      toast.success("Session deleted successfully", {
        duration: 800,
      });
    },
    onError: (error: unknown) => {
      console.log("Error deleting session:", error);
      toast.error("Error deleting session", {
        duration: 800,
      });
    },
  });

  // Function to handle session deletion
  const handleDeleteSession = async (sessionName: string) => {
    if (stockSize > 0) {
      try {
        await deleteStockMutation.mutateAsync(sessionName);
        if (!deleteStockMutation.isLoading) {
          await deleteSessionMutation.mutateAsync(sessionName);
          refetch(); // Refetch session data
        }
      } catch (error) {
        console.log("Error deleting session:", error);
      }
    } else {
      await deleteSessionMutation.mutateAsync(sessionName);
      refetch(); // Refetch session data
    }
  };

  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:8081/websocket");
  //   ws.onmessage = (event) => {
  //     const updatedStocks = JSON.parse(event.data);
  //     setStocks(updatedStocks);
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-blue-100 container_sessionTable">
      <p className="menu-title">Session menu</p>
      <table className=" mx-auto border-collapse sessionTable">
        <thead>
          <tr className="">
            <th className="md:text-xl lg:text-2xl">Count</th>
            <th className="md:text-xl lg:text-2xl">Name</th>
            <th className="md:text-xl lg:text-2xl">Scan</th>
            <th className="md:text-xl lg:text-2xl">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length == 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: "20px" }} className="subtext">
                table is empty
              </td>
            </tr>
          ) : (
            sessions.map((session, index) => (
              <tr key={index}>
                <td className="md:text-xl lg:text-2xl">{index + 1}</td>
                <td className="md:text-xl lg:text-2xl">{session.name}</td>
                <td className="md:text-xl lg:text-2xl">
                  <Link
                    to={{
                      pathname: userRole.includes("Admin")
                        ? "/admin"
                        : "/operator",
                      search: `?session=${encodeURIComponent(session.name)}`,
                    }}
                  >
                    <button
                      style={{ minWidth: "80px" }}
                      className="bg-[#6EC7DF] hover:bg-[#2691b4] md:text-xl lg:text-2xl text-white py-1.5 px-3 rounded-lg button-style"
                    >
                      Scan
                    </button>
                  </Link>
                </td>
                <td className="">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        style={{ minWidth: "80px" }}
                        className="bg-[#6EC7DF] hover:bg-[#2691b4] md:text-xl lg:text-2xl text-white py-1.5 px-3 rounded-lg button-style"
                        onClick={async () => {
                          setSessionName(session.name);
                        }}
                      >
                        Delete
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                          Confirmation
                        </Dialog.Title>
                        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                          Are you sure you want to delete this session?
                        </Dialog.Description>
                        <div className="flex flex-row justify-between items-center">
                          <div className="mt-[25px] flex justify-end">
                            <Dialog.Close asChild>
                              <button className="bg-[#d03940] text-black inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:outline-none">
                                No
                              </button>
                            </Dialog.Close>
                          </div>
                          <div className="mt-[25px] flex justify-end">
                            <Dialog.Close asChild>
                              <button
                                onClick={() =>
                                  handleDeleteSession(session.name)
                                }
                                className="bg-green-300 text-green hover:bg-green focus:shadow-green inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                              >
                                Save changes
                              </button>
                            </Dialog.Close>
                          </div>
                        </div>
                        <Dialog.Close asChild>
                          <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                          >
                            ❌
                          </button>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <UserGuard/>
    </div>
  );
};

export default ViewSessions;
