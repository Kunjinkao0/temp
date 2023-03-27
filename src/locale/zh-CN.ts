import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeMenuManage from '@/views/system/menuManage/locale/zh-CN';
import localeRoleManage from '@/views/system/roleManage/locale/zh-CN';
import localeUserManage from '@/views/system/userManage/locale/zh-CN';
import localeStatical from '@/views/statistical/workplace/locale/zh-CN';
import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localeArchivesElevator from '@/views/archives/elevator/locale/zh-CN';
import localeArchivesMaintain from '@/views/archives/maintain/locale/zh-CN';
import localeArchivesCompany from '@/views/archives/company/locale/zh-CN';
import localeRescueWorkOrder from '@/views/rescue/workOrder/locale/zh-CN';
import localeRescueStatistics from '@/views/rescue/statistics/locale/zh-CN';

import localeMaintainEvaluation from '@/views/demandMaintenance/maintainEvaluation/locale/zh-CN';
import politeTakeElevator from '@/views/complexStatistical/politeTakeElevator/locale/zh-CN';
/** simple */
import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localeMaintenanceStatistics from '@/views/maintenance/maintenanceStatistics/locale/zh-CN';
import localeExtendedMaintenance from '@/views/maintenance/extendedMaintenance/locale/zh-CN';
import localeMaintenanceWorks from '@/views/maintenance/maintenanceWorks/locale/zh-CN';
import localeSocial from '@/views/socialSupervision/social/locale/zh-CN';
import localeFeedBack from '@/views/socialSupervision/feedBack/locale/zh-CN';
import localeEleMap from '@/views/statistical/elevatorMap/locale/zh-CN';
import localeRepairStatistics from '@/views/repair/statistics/locale/zh-CN';
import localeRepairOrders from '@/views/repair/repairOrders/locale/zh-CN';

import localeDemandMaintenanceSettingType from '@/views/demandMaintenance/settingType/locale/zh-CN';

/** simple end */
import localeSettings from './zh-CN/settings';

export default {
  'menu.statistical.workplace': '综合统计',
  'menu.archives': '档案资料',
  'menu.rescue': '救援工作',
  'menu.sys': '系统管理',
  'menu.maintanance': '维保工作',
  'menu.repair': '维修工作',
  'menu.settingType': '类型设置',
  'menu.demand.maintenance': '按需维保',
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'form.search': '查询',
  'form.reset': '重置',
  'search-content': '请输入查询内容',
  'table.batch.edit': '批量编辑',
  'table.batch.import': '批量导入',
  'table.download': '下载',
  'table.index': '序号',
  'table.operate': '操作',
  'table.view': '查看',
  'table.set': '设置',
  'table.delete': '删除',
  'table.update': '修改',
  'form.save': '保存',
  'no-data': '暂无数据',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeStatical,
  ...localeWorkplace,
  ...localeUserManage,
  ...localeRoleManage,
  ...localeMenuManage,
  ...localeArchivesElevator,
  ...localeArchivesMaintain,
  ...localeArchivesCompany,
  ...localeRescueWorkOrder,
  ...localeRescueStatistics,
  ...localeRepairStatistics,
  ...localeRepairOrders,
  ...localeDemandMaintenanceSettingType,
  /** simple */
  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeMaintenanceStatistics,
  ...localeMaintenanceWorks,
  ...localeExtendedMaintenance,
  ...localeMaintenanceWorks,
  ...localeSocial,
  ...localeEleMap,
  ...localeFeedBack,
  ...localeUserSetting,
  ...localeMaintainEvaluation,
  ...politeTakeElevator,
  /** simple end */
};
