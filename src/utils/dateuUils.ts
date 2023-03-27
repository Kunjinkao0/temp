const timeFormat = (date) => {
    let y = date.getFullYear(); 
    let m = fill0(date.getMonth() + 1); 
    let d = fill0(date.getDate()); 
    return `${y}-${m}-${d}`;
}

// 补0
const fill0  = (n) => {
    return (n < 10 ? "0" : "") + n;
}

const getFirstDayOfWeek  = (date) => {
	let weekday = date.getDay()||7; 
    date.setDate(date.getDate()-weekday+1);
    return timeFormat(date);
}

const getFirstDayOfMonth  = (date) => {
    date.setDate(1);
    return timeFormat(date);
}

const getFirstDayOfYear = (date) => {
    date.setDate(1);
    date.setMonth(0);
    return timeFormat(date);
}

// 时间差计算
const differenceTime = (beginTime, endTime) => {
    if(beginTime === '' || endTime === ''){
        return ''
    }

    let dateBegin = new Date(beginTime);
    let dateEnd = new Date(endTime);
    let dateDiff = dateEnd.getTime() - dateBegin.getTime(); // 时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数
    let leave1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000)); // 计算出小时数
    // 计算相差分钟数
    let leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000)); // 计算相差分钟数
    // 计算相差秒数
    let leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000);
    let hoursStr = '';
    let minutesStr = '';
    let secondsStr = '';
    if((dayDiff * 24 + hours)<10){
        hoursStr = `0${dayDiff * 24 + hours}`
    }else {
        hoursStr = `${dayDiff * 24 + hours}`
    }
    if(minutes<10){
        minutesStr = `0${minutes}`
    }else {
        minutesStr = `${minutes}`
    }
    if(seconds<10){
        secondsStr = `0${seconds}`
    }else{
        secondsStr = `${seconds}`
    }
    return `${hoursStr}:${minutesStr}:${secondsStr}`
}

// 时间差计算
const differenceMinute = (beginTime, endTime) => {
    if(beginTime === '' || endTime === ''){
        return '0'
    }

    let dateBegin = new Date(beginTime);
    let dateEnd = new Date(endTime);
    let dateDiff = dateEnd.getTime() - dateBegin.getTime(); // 时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数
    let leave1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000)); // 计算出小时数
    // 计算相差分钟数
    let leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000)); // 计算相差分钟数
    // 计算相差秒数
    let leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000);

    return `${(dayDiff * 24 + hours)*60+(minutes+1)}`
}

// 时间差计算
const differenceDay = (beginTime, endTime) => {
    if(beginTime === '' || endTime === ''){
        return '0'
    }

    let dateBegin = new Date(beginTime);
    let dateEnd = new Date(endTime);
    let dateDiff = dateEnd.getTime() - dateBegin.getTime(); // 时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数

    return dayDiff
}

export { getFirstDayOfWeek, getFirstDayOfMonth, getFirstDayOfYear,differenceTime,differenceMinute,differenceDay };
