import config from "../config.json";
import http from "./httpService";

const endPoint = config.apiUrl + "repairer";

function repairerUrl(id) {
  return `${endPoint}/${id}`;
}

export function getRepairers() {
  console.log(endPoint);
  return http.get(endPoint);
}

export function getRepairer(id) {
  return http.get(repairerUrl(id));
}

export function addRepairer(repairer) {
  return http.post(endPoint, repairer);
}

export function deleteRepairer(id) {
  return http.delete(repairerUrl(id));
}
