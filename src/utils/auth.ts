const TOKEN_KEY = 'token';
const TIXIN_TOKEN_KEY = 'tixinToken';
const TIXIN_USER_EXT_KEY = 'usrExt';
const ORG_OWNER_TREE = 'orgOwnerTree';
const ORG_OWNER_LIST = 'orgOwnerList';
const ORG_OWNER_LOAD_MORE_LIST = 'orgOwnerLoadMoreList';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getTixinToken = () => {
  return localStorage.getItem(TIXIN_TOKEN_KEY);
};
const getTixinUserExt = () => {
  let usrExt = localStorage.getItem(TIXIN_USER_EXT_KEY);
  if(usrExt){
    usrExt = JSON.parse(usrExt);
  }
  return usrExt;
};

const getOrgOwnerTree: any = () => {
  let treeData = localStorage.getItem(ORG_OWNER_TREE);
  if(treeData){
    treeData = JSON.parse(treeData);
  }
  return treeData;
};

const getOrgOwnerList: any = () => {
  let treeData = localStorage.getItem(ORG_OWNER_LIST);
  if(treeData){
    treeData = JSON.parse(treeData);
  }
  return treeData;
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const setTixinToken = (token: string) => {
  localStorage.setItem(TIXIN_TOKEN_KEY, token);
};
const setTixinUserExt = (token: string) => {
  localStorage.setItem(TIXIN_USER_EXT_KEY, token);
};

const setOrgOwnerTree = (orgOwnerTree: string) => {
  localStorage.setItem(ORG_OWNER_TREE, orgOwnerTree);
};

const setOrgOwnerList = (orgOwnerList: string) => {
  localStorage.setItem(ORG_OWNER_LIST, orgOwnerList);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TIXIN_TOKEN_KEY);
  localStorage.removeItem(TIXIN_USER_EXT_KEY);
};

export { isLogin, getToken, getTixinToken, setToken,setTixinToken, clearToken,getTixinUserExt,setTixinUserExt,setOrgOwnerTree,getOrgOwnerTree,setOrgOwnerList,getOrgOwnerList };
