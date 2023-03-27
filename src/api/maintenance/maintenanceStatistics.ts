import axios from 'axios';
import qs from 'query-string';

export interface UnderMaintenanceOrderRecord {
  id: string;
  ranking: string;
  mainName: string;
  score: string;
}

export interface AfterMaintenanceOrderRecord {
    id: string;
    ranking: string;
    mainName: string;
    beforscore: string;
    afterscore: string;
  }

export interface OverTimeOrderRecord {
    id: string;
    ranking: string;
    mainUnitName: string;
    elevatorNum: string;
}

export interface pageParams {
  current: number;
  pageSize: number;
}

export interface UnderMaintenanceOrderListRes {
  list: UnderMaintenanceOrderRecord[];
  total: number;
}

export interface AfterMaintenanceOrderListRes {
    rows: AfterMaintenanceOrderRecord[];
    total: number;
  }

export interface OverTimeOrderListRes {
    rows: OverTimeOrderRecord[];
    total: number;
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

export function getMainStandardRanking(params) {
  return axios.post('/supervise/getMainStandardRanking.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getMainContrastRanking(params) {
  return axios.post('/supervise/getMainContrastRanking.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getMainOverRanking(params) {
  return axios.post('/supervise/getMainOverRanking.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getMainOverTimeStat(params) {
  return axios.post('/supervise/getMainOverTimeStat.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}
