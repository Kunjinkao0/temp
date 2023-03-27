import axios from 'axios';
import qs from 'query-string';
import {ElevatorListPage} from '../archives/types/elevatorType';

export function getEleAreaIndexList() {
  return axios.post('/supervise/getEleAreaIndexList.do', {}, {
    baseURL: import.meta.env.VITE_DEV_API,
  });
}
// 电梯地图
export function getEleMapList(params: ElevatorListPage) {
    return axios.post('/supervise/getEleMapData.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}


