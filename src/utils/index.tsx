import { QueryClient } from "react-query";

// Query Client
export const queryClient = new QueryClient();

//If the EC2 instance on AWS is stopped and run again, it will generate the Public IPv4 DNS, then
//we have to go into AWS console EC2 instance and copy that Public IPv4 DNS and paste here on React
const BASE_URL = "https://ec2-52-76-37-7.ap-southeast-1.compute.amazonaws.com";
//const BASE_URL = "http://localhost:8081"; //this is for local dev only

export const API_USER = {
  createUser: `${BASE_URL}/users/add`, //http://localhost:8081/users/add
  //deleteUser: (userName: string) => `${BASE_URL}/users/${userName}`,
  getUsers: `${BASE_URL}/users`, //http://localhost:8081/users
  //getAllUsers: `${BASE_URL}/users/all`,
  //getSessions: `${BASE_URL}/sessions`,
  login: `${BASE_URL}/users/login`,
};

export const API_STOCK = {
  assignOperator: `${BASE_URL}/stocks/assign`, //http://localhost:8081/stocks/assign
  createStock: `${BASE_URL}/stocks/add`, //http://localhost:8081/stocks/add
  deleteStockSession: `${BASE_URL}/stocks/delete-stocks-session`, //http://localhost:8081/stocks/delete-stocks-session
  //getStocks: `${BASE_URL}/stocks`,
  //getAllStocks: `${BASE_URL}/stocks/all`,
  getStocksOperator: `${BASE_URL}/stocks/operator`, //"http://localhost:8081/stocks/operator"
  getStocksSession: `${BASE_URL}/stocks/admin`, ////`http://localhost:8081/stocks/admin
};

export const API_SESSION = {
  createSession: (adminName: string) => `${BASE_URL}/sessions/${adminName}/add`, //http://localhost:8081/sessions/${username}/add?name=${newSessionName}&createdAt=${createdAt}
  deleteSession: `${BASE_URL}/sessions/delete`, //http://localhost:8081/sessions/delete
  getAllSessions: `${BASE_URL}/sessions/all`, //"http://localhost:8081/sessions/all"
  //getSessionOperator: (operatorName: string) =>`${BASE_URL}/sessions/${operatorName}`,
};

export const API_OS = {
  addStocksOperator: `${BASE_URL}/assign`, //"http://localhost:8081/assign"
};
