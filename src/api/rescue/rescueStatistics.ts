import axios from 'axios';
import qs from 'query-string';

export interface AfterMaintenanceOrderRecord {
  id: string;
  ranking: string;
  mainName: string;
  beforscore: string;
  afterscore: string;
}

export interface AfterMaintenanceOrderListRes {
  list: AfterMaintenanceOrderRecord[];
  total: number;
}

export interface pageParams {
  page: number;
  size: number;
}

export function getOwnerIndexList() {
  return axios.post('/supervise/getOwnerIndexList.do', {}, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleMaintainIndexList() {
  return axios.post('/supervise/getEleMaintainIndexList.do', {}, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getElePropertyIndexList() {
  return axios.post('/supervise/getElePropertyIndexList.do', {}, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleWorkStat(params) {
  return axios.post('/supervise/getEleWorkStat.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getRescueDurationStat(params) {
  return axios.post('/supervise/getRescueDurationStat.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getRescueTimesStat(params) {
  return axios.post('/supervise/getRescueTimesStat.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getRescueDurationRanking(params) {
  return axios.post('/supervise/getRescueDurationRanking.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getTrappedReasonAnal(params) {
  return axios.post('/supervise/getTrappedReasonAnal.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getRescueWarningEleList(params) {
  return axios.post('/supervise/getRescueWarningEleList.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getRescueWarningEleStat(params) {
  return axios.post('/supervise/getRescueWarningEleStat.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}