import config from "../config.json";
import http from "./httpService";

const endPoint = config.apiUrl + "employee";

function employeeUrl(id) {
  return `${endPoint}/${id}`;
}

export function getEmployees() {
  return http.get(endPoint);
}

export function getEmployee(id) {
  return http.get(employeeUrl(id));
}

export function addEmployee(employee) {
  return http.post(endPoint, employee);
}

export function updateEmployee(id, employee) {
  return http.put(employeeUrl(id), employee);
}

export function deleteEmployee(id) {
  return http.delete(employeeUrl(id));
}
