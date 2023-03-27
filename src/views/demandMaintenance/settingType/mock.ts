import Mock from 'mockjs';
import { h } from 'vue';
import qs from 'query-string';
import { IconFolder } from '@arco-design/web-vue/es/icon';
import { GetParams } from '@/types/global';

import setupMock, {
  successResponseWrap,
} from '@/utils/setup-mock';

const { Random } = Mock;
// 模拟设置类型列表数据
const data = Mock.mock({
  'list|100': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'typeName': Random.csentence(8, 12),
      'typeNote': Random.csentence(8, 12),
      'setTime': Random.date('yyyy-MM-dd HH:mm:ss'),
      'state|0-1': 1,
    },
  ],
});

// 模拟设置类型列表数据
const detail = Mock.mock(
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'typeName': Random.csentence(8, 12),
      'typeNote': Random.csentence(8, 12),
      'addEquipment|0-1': 1,
      'lastYearCheck|0-1': 1,
      'eleUseAge': Random.csentence(8, 12),
      'registerAddr': Random.csentence(8, 12),
      'accidentAge': Random.csentence(8, 12),
      'legalDuty|0-1': 1,
      'maintenanceLicense|0-1': 1,
      'isEleUseAge|0-1': 1,
      'yearlyInspectionPassRate': Random.csentence(8, 12),
      'yearlyInspectionPassYears': Random.csentence(8, 12),
      'mainLongestInterval': Random.csentence(8, 12),
      'uploadPhotoOrvideo|0-1': 1,
  });



setupMock({
  setup() {
    
    // 获取设置类型列表数据
    Mock.mock(new RegExp('/api/settingType/list'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = current as number;
      const ps = pageSize as number;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 12,
      });
    });

    // 设置单条设置类型信息
    Mock.mock(new RegExp('/api/settingType/detail'), (params: any) => {
        return successResponseWrap(detail);
    });

    // 保存设置类型单条数据
    Mock.mock(new RegExp('/api/settingType/update'), (params: any) => {
        return successResponseWrap(true);
    });

    // 保存设置类型开关单条数据
    Mock.mock(new RegExp('/api/settingType/updateSwitch'), (params: any) => {
      return successResponseWrap(true);
  });
  },
});
