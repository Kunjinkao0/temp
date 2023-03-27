// @ts-ignore
import md5 from 'md5';
import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user'; 
import { queryTreeList } from '@/api/tree'

import {toLoadMoreTree, toOrgTree } from '@/utils/common';
import {setToken, setTixinToken, clearToken, setTixinUserExt,setOrgOwnerTree, setOrgOwnerList } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    userName:"",
    nickName:'',
    role: '',
    code: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res: any = await getUserInfo();
      const roleCodes = res.data.role.join(',');
      res.data.role = roleCodes
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        let resLoginForm={
          password: md5(loginForm.password),
          userName: loginForm.userName
        }
        const res: any = await userLogin(resLoginForm);
        // TODO::
        setTixinToken(res.data.tixinToken);
        setToken(res.data.tokenValue);
        if(res.data.userExt){
          setTixinUserExt(JSON.stringify(res.data.userExt));
        }

        const params = {
            fromPage: "web"
        }

        // 组织项目树缓存
        const { data:orgOwnerList } = await queryTreeList(params)
        setOrgOwnerList(JSON.stringify(orgOwnerList))
        setOrgOwnerTree(JSON.stringify(toOrgTree(orgOwnerList)))

        return res
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
