import axios from 'axios';
import qs from 'query-string';
import type { TableData } from '@arco-design/web-vue/es/table/interface';

export interface ContentDataRecord {
  x: string;
  y: number;
}

export interface ComprehensiveStat {
  ele: object;
  mai: object;
  rep: object;
  res: object;
  urgRep: object;
}

export function queryContentData() {
  return axios.get<ContentDataRecord[]>('/api/content-data');
}

export interface overTimeRecord {
  id: number;
  mainUnitName: string;
  sore: string;
}

export interface RescueWorkRecord {
  id: number;
  state: string;
  address: string;
  time: string;
}

export interface pageParams {
  current: number;
  pageSize: number;
}

export interface overTimeListRes {
  list: overTimeRecord[];
  total: number;
}

export interface RescueWorkListRes {
  rows: RescueWorkRecord[];
  total: number;
}

export function getComprehensiveStat() {
  return axios.post<ComprehensiveStat>('/supervise/getComprehensiveStat.do', {} ,{
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleBrandStat() {
  return axios.post('/supervise/getEleBrandStat.do', {} ,{
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleAgeStat() {
  return axios.post('/supervise/getEleAgeStat.do', {} ,{
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getTrappedReasonAnal(params) {
  return axios.post('/supervise/getTrappedReasonAnal.do', params ,{
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleWorkList(params) {
  return axios.post<RescueWorkListRes>('/supervise/getEleWorkList.do',  params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getEleTypeStat() {
  return axios.post('/supervise/getEleTypeStat.do',  {} , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}

export function getMainCreditEval(params) {
  return axios.post('/supervise/getMainCreditEval.do',  params , {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}