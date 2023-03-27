import { defineStore } from 'pinia';
import { getBtnRoles } from '@/api/menuManage';
import { BtnProps,BtnState } from './types';

const useBtnStore = defineStore('btn', {
  state: (): BtnState => ({
    btnRole: []
  }),

  getters: {
    getBtnRoles(state: BtnState) {
      return { ...state.btnRole };
    },
  },

  actions: {
    async setBtnRoles(){
      const res = await getBtnRoles();
      this.btnRole = res.data
    },

    getBtnRole(menuCode: string,operate: string){
      const btnRolesList = []
      this.btnRole.forEach((val) => {
          if(val.roleCode === `${menuCode}-${operate}`){
            btnRolesList.push(val)
          }
      })

      if(btnRolesList.length>0){
        if(btnRolesList[0].roles !== undefined && btnRolesList[0].roles !== null && btnRolesList[0].roles !== ''){
          return btnRolesList[0].roles.split(',');
        }
      }

      return []
    }
  },
});

export default useBtnStore;
