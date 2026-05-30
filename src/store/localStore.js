import { appConstants } from "helpers/constants/appConstant";
import { localstorageService } from "helpers/services/localstorageService";

const localStore = {};

localStore.setToken = (v) =>
  localstorageService.set(appConstants.localStorage.tokenKey, v);
localStore.getToken = () =>
  localstorageService.get(appConstants.localStorage.tokenKey);
localStore.resetToken = () =>
  localstorageService.remove(appConstants.localStorage.tokenKey);
localStore.getRole =() =>
  localstorageService.get(appConstants.localStorage.roleKey);
localStore.setRole = (v) =>
  localstorageService.set(appConstants.localStorage.roleKey, v);
localStore.resetRole = () =>
  localstorageService.remove(appConstants.localStorage.roleKey);



// localStore.setrefreshToken = (v) =>
//   localstorageService.set(appConstants.localStorage.refreshTokenKey, v);
// localStore.getrefreshToken = () =>
//   localstorageService.get(appConstants.localStorage.refreshTokenKey);

export { localStore };
