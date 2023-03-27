import axios from 'axios';
import { FaultListPageParams, FaultDetailQueryParams } from './types/faultType';

// 电梯档案详情-物联数据-查询困人故障、故障数据、异常数据列表
export function queryFaultList(params: FaultListPageParams) {
    return axios.post('/supervise/getEleFaultList.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案详情-物联数据-故障详情
export function getEleFaultDetail(params: FaultDetailQueryParams) {
    return axios.post('/supervise/getEleFaultDetail.do', params, {
        baseURL: import.meta.env.VITE_DEV_API
    });
}
