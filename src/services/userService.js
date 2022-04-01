import config from "../config.json";
import http from "./httpService";

const endPoint = config.apiUrl + "User/";

export function getUserByName(username) {
  const query = endPoint.concat("GetByUsername?username=".concat(username));
  return http.get(query);
}

export function getUsers() {
  http.get(endPoint);
}

export function registerUser(user) {
  return http.post(endPoint.concat("register"), {
    username: user.username,
    password: user.password,
    role: user.role,
  });
}

export function authUser(user) {
  return http.post(endPoint.concat("auth"), user);
}

export function deleteUser(id) {
  return http.delete(`${endPoint}/${id}`);
}
