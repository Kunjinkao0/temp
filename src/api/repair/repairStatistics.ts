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
    mainName: string;
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
    list: AfterMaintenanceOrderRecord[];
    total: number;
  }

export interface OverTimeOrderListRes {
    list: OverTimeOrderRecord[];
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

export function getRepairNumRanking(params) {
  return axios.post('/supervise/getRepairNumRanking.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getAvgRepairTimesRanking(params) {
  return axios.post('/supervise/getAvgRepairTimesRanking.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}