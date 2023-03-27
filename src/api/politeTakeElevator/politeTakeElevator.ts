import axios from 'axios';

// 不文明乘梯统计
export function getNotPoliteTakeElevatorStatistic(params) {
	return axios.post('/supervise/getEleUncivilStat.do', params, {
		baseURL: import.meta.env.VITE_DEV_API,
	});
}

// 不文明乘梯趋势
export function getUnCivilTakeElevatorTrend(params) {
	return axios.post('/supervise/getEleUncivilTrend.do', params, {
		baseURL: import.meta.env.VITE_DEV_API,
	});
}

// 不文明乘梯趋势
export function getUnCivilTakeElevatorRank(params) {
	return axios.post('/supervise/getEleUncivilRanking.do', params, {
		baseURL: import.meta.env.VITE_DEV_API,
	});
}

// 不文明乘梯趋势
export function getFaultList(params) {
	return axios.post('/supervise/getEleFaultList.do', params, {
		baseURL: import.meta.env.VITE_DEV_API,
	});
}