import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeMenuManage from '@/views/system/menuManage/locale/en-US';
import localeRoleManage from '@/views/system/roleManage/locale/en-US';
import localeUserManage from '@/views/system/userManage/locale/en-US';
import localeStatical from '@/views/statistical/workplace/locale/en-US';
import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
import localeArchivesElevator from '@/views/archives/elevator/locale/zh-CN';
/** simple */
import localeMonitor from '@/views/dashboard/monitor/locale/en-US';

import localeSearchTable from '@/views/list/search-table/locale/en-US';
import localeCardList from '@/views/list/card/locale/en-US';

import localeStepForm from '@/views/form/step/locale/en-US';
import localeGroupForm from '@/views/form/group/locale/en-US';

import localeBasicProfile from '@/views/profile/basic/locale/en-US';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/en-US';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/en-US';

import localeSuccess from '@/views/result/success/locale/en-US';
import localeError from '@/views/result/error/locale/en-US';

import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';

import localeUserInfo from '@/views/user/info/locale/en-US';
import localeUserSetting from '@/views/user/setting/locale/en-US';


import localeMaintenanceStatistics from '@/views/maintenance/maintenanceStatistics/locale/en-US';
import localeMaintenanceWorks from '@/views/maintenance/maintenanceWorks/locale/en-US';
/** simple end */
import localeSettings from './en-US/settings';

export default {
  'menu.archives': 'Archives',
  'menu.system.userManage': 'User Manage',
  'menu.statistical.workplace': 'Statistical',
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeStatical,
  ...localeWorkplace,
  ...localeUserManage,
  ...localeMenuManage,
  ...localeRoleManage,
  ...localeArchivesElevator,
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
  ...localeUserSetting,
  /** simple end */
};
