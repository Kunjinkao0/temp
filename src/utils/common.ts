// 构建树结构
export const toTree = (data) => {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 realId 为 KEY 的 map 索引数据列
    const map = {};
    data.forEach(function (item) {
        item.key = item.id;
        item.title = item.orgName;
        map[item.id] = item;
    });

    const val = [];
    data.forEach(function (item) {
        // 以当前遍历项的pId, 去map对象中找到索引的id
        const parent = map[item.parentId];
        // 如果找到索引，说明此项不在顶级当中, 需要把此项添加到对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });

    return val;
};


// 构建组织项目树结构
export const toOrgTree = (data) => {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 realId 为 KEY 的 map 索引数据列
    const map = {};
    data.forEach(function (item) {
        item.key = item.id;
        item.title = item.name;
        map[item.id] = item;
    });

    const val = [];
    data.forEach(function (item) {
        // 以当前遍历项的pId, 去map对象中找到索引的id
        const parent = map[item.pId];
        // 如果找到索引，说明此项不在顶级当中, 需要把此项添加到对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });

    return val;
};

// 构建组织项目树结构
export const toLoadMoreTree = (data) => {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 realId 为 KEY 的 map 索引数据列
    const map = {};
    data.forEach(function (item) {
        item.key = item.id;
        item.title = item.name;
        map[item.id] = item;
    });

    const val = [];
    data.forEach(function (item) {
        // 以当前遍历项的pId, 去map对象中找到索引的id
        const parent = map[item.pId];
        const isHavaChild = map[item.id];
        if(!isHavaChild){
            item.isLeaf = true
        }
        // 如果找到索引，说明此项不在顶级当中, 需要把此项添加到对应的父级中
        if (parent) {
            if(parent.pId === '-1,1'){
                (parent.children || (parent.children = [])).push(item);
            }
        } else {
            // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
};

/* 参数
    * array 树结构 查找所有叶子节点
*/
let nodeIds = []
const parseTreeJson = (array) => {
    array.forEach(element => {
        // 1.判断element.children是对象
        if (element.children && typeof (element.children) === 'object') {
            parseTreeJson(element.children)
            return
        } 

        // 获得符合的 nodeId
        if(element.id && element.id !== ''){
            nodeIds.push(element.id.split(',')[0]);
        }
    })
}

/*
*  getTreeIds() 递归当前点击的树层级下的所有key
*  unique() 数组去重
* */
const loopTreeJson = (array, nodeId) => {
    array.forEach(element => {
        if (element.id === nodeId) {
            // 判断element.children是对象
            if (element.children && typeof (element.children) === 'object') {
                // 查找叶子节点
                parseTreeJson(element.children)
            }
        } else if (element.children && typeof (element.children) === 'object') {
            // 判断element.children是对象
            // 继续遍历子节点查找当前nodeId
            loopTreeJson(element.children, nodeId)
        }
    })
}

export const getTreeKey = (array, nodeId) => {
    nodeIds = []
    loopTreeJson(array, nodeId)
    return nodeIds
}


export const getWorkSource = (sourceId) => {
    if(sourceId === null && sourceId === '' && sourceId === undefined){
        return '';
    }

    // 事件渠道 1.故障消息、2.自动创建、3.后台派发、4.监管派发、5.工作人员创建、6.一键救援、7.物联网预警、8.电话报警 
    // 9、乘客扫码 51.维保创建 52.物业创建 53.维保二维码创建 54.物业二维码创建
    switch(sourceId){
        case 1:
            return '故障消息'
        case 2:
            return '自动创建'
        case 3:
            return '后台派发'
        case 4:
            return '监管派发'
        case 5:
            return '工作人员创建'
        case 6:
            return '一键救援'
        case 7:
            return '物联网预警'
        case 8:
            return '电话报警'
        case 9:
            return '乘客扫码'
        case 51:
            return '维保创建'
        case 52:
            return '物业创建'
        case 53:
            return '维保二维码创建'
        case 54:
            return '物业二维码创建'
        default :
            return ''
    }
}


export const getMainWorkChildType = (workId) => {
    if(workId === null && workId === '' && workId === undefined){
        return '';
    }

    // 事件渠道 1.半月维保、2.季度维保、3.半年维保、4.年度维保
    switch(workId){
        case 1:
            return '半月维保'
        case 2:
            return '季度维保'
        case 3:
            return '半年维保'
        case 4:
            return '年度维保'
        default :
            return ''
    }
}

export const getFaultReasion = (reasionId) => {
    if(reasionId === null && reasionId === '' && reasionId === undefined){
        return '';
    }

    // 故障原因 1.人为原因、2.外部原因、3.门系统、4.曳引系统、5.控制系统、6.安全保护装置、7.其他
    switch(reasionId){
        case 1:
            return '人为原因'
        case 2:
            return '外部原因'
        case 3:
            return '门系统'
        case 4:
            return '曳引系统'
        case 5:
            return '控制系统'
        case 6:
            return '安全保护装置'
        case 7:
            return '物联其他网预警'
        default :
            return ''
    }
}

export const getCardoorState = (stateId) => {
    if(stateId === null && stateId === '' && stateId === undefined){
        return '';
    }

    // 门状态 0.未知、1.正在关门、2.关门到位、3.正在开门、4.开门到位、5.门锁锁止
    switch(stateId){
		case 0:
		    return '未知'
        case 1:
            return '正在关门'
        case 2:
            return '关门到位'
        case 3:
            return '正在开门'
        case 4:
            return '开门到位'
        case 5:
            return '门锁锁止'
        default :
            return ''
    }
}

export const getControlType = (typeId) => {
    if(typeId === null && typeId === '' && typeId === undefined){
        return '';
    }

    // 控制类型 1.按钮、2.信号、3.集选、4.群控、5.单控、6.并联、7.下集选
    switch(typeId){
        case 1:
            return '按钮'
        case 2:
            return '信号'
        case 3:
            return '集选'
        case 4:
            return '群控'
        case 5:
            return '单控'
		case 6:
			return '并联'
		case 7:
			return '下集选'
        default :
            return ''
    }
}
 
export const getFaultResource = (resourceId) => {
    if(resourceId === null && resourceId === '' && resourceId === undefined){
        return '';
    }

    switch(resourceId){
        case 1:
            return 'FPU'
        case 2:
            return 'CUG'
        case 3:
            return '一键呼'
        case 4:
            return '黑匣子'
        case 5:
            return '按键报警器'
		case 6:
			return '梯米'
        default :
            return ''
    }
}

export const getFaultAnalysis = (analysisId) => {
    if(analysisId === null && analysisId === '' && analysisId === undefined){
        return '';
    }
    switch(analysisId){
        case 101:
            return '异物卡阻导致开关门受阻，电梯停止运行'
        case 102:
            return '房屋装修、搬运导致电梯停止运行'
        case 103:
            return '阻挡关门时间过长，电梯无法运行'
        case 104:
            return '其他'
        case 201:
            return '电梯在运行过程中出现的停电'
		case 202:
			return '电气部件进水导致的短路故障'
		case 203:
			return '机房温度过高，电气控制系统自动保护'
		case 204:
			return '其他'
		case 301:
			return '轿门锁失效'
		case 302:
			return '厅门锁失效'
		case 303:
			return '门机故障'
		case 304:
			return '门刀与滚轮（球）间距调整不良'
		case 305:
			return '安全触板、光幕等防夹人保护装置无效'
		case 306:
			return '门挂轮破损'
		case 307:
			return '门导向系统失效'
		case 308:
			return '其他'
		case 401:
			return '平衡系数不在标准范围内'
		case 402:
			return '曳引轮（轴）磨损'
		case 403:
			return '钢丝绳卡阻或跳槽'
		case 404:
			return '变速箱故障'
		case 405:
			return '制动器故障'
		case 406:
			return '其他'
		case 501:
			return '控制主板失效'
		case 502:
			return '房屋装修、搬运导致电梯停止运行'
		case 503:
			return '平层感应器失效'
		case 504:
			return '极限开关、急停开关、维修开关等传感器失效'
		case 505:
			return '电气连接不可靠'
		case 506:
			return '编码器失效'
		case 507:
			return '调速装置失效（变频器）'
		case 508:
			return '召唤失效'
		case 509:
			return '其他'
		case 601:
			return '安全回路断开'
		case 602:
			return '限速器开关动作'
		case 603:
			return '安全钳开关动作'
		case 604:
			return '缓冲器开关动作'
		case 605:
			return '张紧轮开关动作'
		case 606:
			return '上行超速保护开关动作'
		case 607:
			return '意外移动'
		case 608:
			return '其他'
		case 609:
			return '超载导致电梯停止运行'
		case 610:
			return '紧急报警失效'
		case 700:
			return '其他故障'
        default :
            return ''
    }
}

export const getMainTypeOption = () => {
    return [
        {
            id: 1,
            name: '半月维保'
        },
        {
            id: 2,
            name: '季度维保'
        },
        {
            id: 3,
            name: '半年维保'
        },
        {
            id: 4,
            name: '年度维保'
        }
    ]
}

export const getFaultState = (state) => {
    if(state === null && state === '' && state === undefined){
        return '';
    }

    switch(state){
        case 0:
            return '未确认'
        case 1:
            return '已确认'
        default :
            return ''
    }
}

export const getFaultResourceV2 = (resourceId) => {
    if(resourceId === null && resourceId === '' && resourceId === undefined){
        return '';
    }

    switch(resourceId){
        case 6:
            return '黑匣子TIM'
        case 7:
            return '梯载屏'
        case 8:
            return '摄像头'
        default :
            return ''
    }
}

