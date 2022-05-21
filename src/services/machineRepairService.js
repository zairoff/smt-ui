import config from "../config.json";
import http from "./httpService";

const endPoint = config.apiUrl + "machineRepair";

function machineRepairUrl(id) {
  return `${endPoint}/${id}`;
}

export function getMachineRepairs() {
  return http.get(endPoint);
}

export function getMachineRepair(id) {
  return http.get(machineRepairUrl(id));
}

export function addMachineRepair(machineRepair) {
  return http.post(endPoint, machineRepair);
}

export function deleteMachineRepair(id) {
  return http.delete(machineRepairUrl(id));
}
