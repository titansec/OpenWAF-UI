import {Injectable} from "@angular/core";
import {Urls} from "../../@theme/const/url";
import {BasicHttpService} from "../../@theme/http/basichttp.service";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  accessRuleUrl = Urls.baseUrl + '/access_rule';
  policyUrl = Urls.baseUrl + '/policy/policy_uuids';

  constructor(private _basicHttpService: BasicHttpService) {

  }

  getAccessRuleList = function () {
    const opt = this._basicHttpService.NewReqOpts();
    return this._basicHttpService.MyList(this.accessRuleUrl, opt);
  }

  getPolicyAll = function() {
    const opt = this._basicHttpService.NewReqOpts();
    return this._basicHttpService.MyList(this.policyUrl, opt);
  }

  addAccessRule = function (data, user: string, uuid?: string) {
    const opt = this._basicHttpService.NewReqOpts();
    if (uuid) {
      user = user + '/' + uuid;
    }
    return this._basicHttpService.MyPost(this.accessRuleUrl + '/' + user, data, opt, true);
  }

  setAccessRule = function (data, user: string, uuid: string) {
    const opt = this._basicHttpService.NewReqOpts();
    return this._basicHttpService.MyPut(this.accessRuleUrl + '/' + user + '/' + uuid, data, opt, true);
  }

  deleteAccessRule(user, uuid) {
    const opt = this._basicHttpService.NewReqOpts();
    return this._basicHttpService.MyDelete(this.accessRuleUrl + '/' + user + '/' + uuid, opt, true);
  }

}
