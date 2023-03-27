import axios from 'axios';
import qs from 'query-string';

// 请求参数table结构
export interface QueryRecordParams {
  id: string;
  name: string;
  description: string;
  lastModifyTime: string;
  status: string;
}

// 设置开关参数结构
export interface SavaSwitchRecordParams {
    id: string;
    state: string;
}

// 保存数据参数结构
export interface SaveRecordParams {
    id: string;
    name: string;
    description: string;
    iotDeviceStatus: number;
    yearInspectionStatus: number;
    useServiceLife: number;
    maintainAddress: string;
    safetyAccidentYears: number;
    legalResponsibilityStatus: number;
    maintenancelicenseStatus: number;
    userServiceLife: string;
    inspectionPassRate: number;
    inspectionPassYears: number;
    matainInterval: number;
    needUploadMedia: number;
}

// 请求参数分页结构
export interface QueryParams extends Partial<QueryRecordParams> {
  page: number;
  size: number;
}

// 响应结构
export interface ListResopnse {
  rows: QueryRecordParams[];
  total: number;
}


export interface SettingTypeId {
  id: string
}

// 查询设置类型列表
export function querySettingTypeList(params: QueryParams) {
  return axios.post('/supervise/getMaintainDemandPromiseList.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
});
}

// 获取单条设置类型信息
export function querySettingTypeDetail(params: SettingTypeId) {
    return axios.post<SaveRecordParams>('/supervise/getMaintainDemandPromiseDetail.do', params, {
      baseURL: import.meta.env.VITE_DEV_API,
  });
}

// 保存设置类型单条数据
export function updateSettingType(params) {
  return axios.post<SaveRecordParams>('/supervise/updateMaintainDemandPromise.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
});
}

// 添加设置类型单条数据
export function addSettingType(params) {
  return axios.post<SaveRecordParams>('/supervise/addMaintainDemandPromise.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
});
}

// 删除设置类型数据
export function deleteSettingType(params) {
  return axios.post<SaveRecordParams>('/supervise/deleteMaintainDemandPromise.do', params, {
    baseURL: import.meta.env.VITE_DEV_API,
});
}
