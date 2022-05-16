import config from "../config.json";
import http from "./httpService";

const endPoint = config.apiUrl + "repair";

function repairUrl(id) {
  return `${endPoint}/${id}`;
}

export function getRepairs() {
  return http.get(endPoint);
}

export function getRepairsByDate(date) {
  const query = endPoint.concat("/GetByDate?date=").concat(date);
  return http.get(query);
}

export function getRepair(id) {
  return http.get(repairUrl(id));
}

export function addRepair(repair) {
  return http.post(endPoint, repair);
}

export function deleteRepair(id) {
  return http.delete(repairUrl(id));
}
