import axios from 'axios';
import {
    ElevatorListPage,
    EleId,
    DevCode,
    WaveParams,
    ArchivesWorkOrderListPage,
    WorkId,
} from './types/elevatorType';

// 使用场所下拉
export function getEleTypeIndexList() {
	return axios.post('/supervise/getEleTypeIndexList.do', {}, {
		baseURL: import.meta.env.VITE_DEV_API,
	});
}

// 查询电梯档案列表
export function queryElevatorList(params: ElevatorListPage) {
    return axios.post('/supervise/getEleArchivesList.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案详情-查询电梯资料
export function getEleArchivesDetail(params: EleId) {
    return axios.post('/supervise/getEleArchivesDetail.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 公众反馈详情
export function getEleAdvocateDetail(params: Id) {
    return axios.post('/supervise/getEleAdvocateDetail.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案详情-物联数据-实时数据
export function getDevRltDataByArchives(params: DevCode) {
    return axios.post('/supervise/getDevRltData.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案详情-物联数据-运行信息
export function getDevRunDataByArchives(params: DevCode) {
    return axios.post('/supervise/getDevRunData.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案详情-物联数据-电梯故障统计
export function getEleFaultStatByArchives(params: EleId) {
    return axios.post('/supervise/getEleFaultStat.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案详情-查询安全指数
export function getSafetyIndexByArchives(params: DevCode) {
    return axios.post('/supervise/getEleSafetyIndex.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案详情-物联数据-查询波形数据
export function getEleFaultWaveByArchives(params: WaveParams) {
    return axios.post('/supervise/getEleFaultWave.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

export interface QueryWorksheetParams {
    type: number;
}

export interface ListWorksheetResopnse {
    rows: QueryWorksheetParams[];
    total: number;
}

// 电梯档案-查询救援工单、维保工单、维修工单列表
export function queryWorkOrderListByArchives(
    params: ArchivesWorkOrderListPage
) {
    return axios.post('/supervise/getSingleEleWorkList.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}

// 电梯档案-查询救援工单、维保工单、维修工单 日志详情
export function queryWorkOrderDetailByArchives(params: WorkId) {
    return axios.post('/supervise/getEleWorkDetail.do', params, {
        baseURL: import.meta.env.VITE_DEV_API,
    });
}
