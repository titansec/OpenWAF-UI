import {Injectable} from '@angular/core';
import {BasicHttpService} from "../../@theme/http/basichttp.service";
import {Urls} from "../../@theme/const/url";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class PolicyService {

    policyUrl = Urls.baseUrl + '/policy';

    constructor(private _basicHttpService: BasicHttpService) {
    }
    // policy
    getPolicyAll = function () {
        const opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyPolicy(this.policyUrl, opt);
    }

    getPolicy(id) {
        const opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyGet(this.policyUrl + '/' + id, opt);
    }

    addPolicy(uuid, data) {
        const opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyPost(this.policyUrl + '/' + uuid, data, opt, true);
    }

    setPolicy(id, data) {
        const opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyPut(this.policyUrl + '/' + id, data, opt, true);
    }

    deletePolicy(id) {
        const opt = this._basicHttpService.NewReqOpts();
        return this._basicHttpService.MyDelete(this.policyUrl + '/' + id, opt, true);
    }

}
