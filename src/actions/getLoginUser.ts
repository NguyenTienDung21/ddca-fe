import axios from "axios";
import instance from "./instance";
import {API_USER} from '../utils/index';

// Login User
export const getLoginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await instance.post(API_USER.login, {
    username,
    password,
  });
  return response.data;
};
