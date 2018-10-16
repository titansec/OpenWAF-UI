/**
 * Created by shenxy on 2018/5/3.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, tap} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";

const httpOptions = {
  headers: new HttpHeaders(),
  params: new HttpParams()
};

@Injectable(
  {
    providedIn: 'root'
  }
)
export class BasicHttpService {

  private errorCode = {
    401: '服务器验证失败',
    404: '无法找到页面',
    422: '422是什么',
    428: '428又是什么',
    501: '501',
    502: '502',
    503: '503',
  };

  constructor(private _http: HttpClient,
              private router: Router) {
  }

// TODO 这个主要是为了解决RequestOptions里面的header为undefined的问题
  NewReqOpts(header ?: HttpHeaders, param ?: HttpParams) {
    if (header) {
      httpOptions.headers = header;
    } else {
      httpOptions.headers = new HttpHeaders();
    }
    if (param) {
      httpOptions.params = param;
    } else {
      httpOptions.params = new HttpParams();
    }
    return httpOptions;
  }

  MyRequest(method: string, url: string, reqOpts: any, requireAuth ?: boolean) {
    // 添加认证信息
    /*if (requireAuth) {
      const token = sessionStorage.getItem('token');
      if (token) {
        reqOpts.headers = reqOpts.headers.set('Authorization', 'icsexamuser ' + token)
      }
    }*/
    return this._http.request(method, url, reqOpts)
      .pipe(catchError(error => {
        let code = 422;
        if (error.error._error) {
          code = error.error._error.code;
        }
        if (code === 401) {
          this.router.navigate(['auth', 'login']);
          sessionStorage.clear();
        }

        return throwError(error);
      }))
  }

  MyList(url: string, reqOpts: any) {

    return this.MyRequest('get', url, reqOpts)
      .pipe(map(
        res => {
          return res;
        }
        )
      )
  }
  MyPolicy(url: string, reqOpts: any) {

    return this.MyRequest('get', url, reqOpts)
      .pipe(map(
        res => {
          const rows = [];
          for (let val in res['result']) {
            if (val !== 'policy_uuids') {
              rows.push(
                {
                  name: val,
                  result: res['result'][val]
                }
              )
            }
          }
          return rows;
        }
        )
      )
  }

  MyGet(url: string, reqOpts: any) {
        return this.MyRequest('get', url, reqOpts)
  }

  MyPost(url: string, body: any, reqOpts: any, requireAuth: boolean = true) {
    if (body != null) {
      reqOpts.body = body
    }
    return this.MyRequest('post', url, reqOpts, requireAuth)
  }

  MyPut(url: string, body: any, reqOpts: any, requireAuth: boolean = true) {
    if (body != null) {
      reqOpts.body = body
    }
    return this.MyRequest('put', url, reqOpts, requireAuth)
  }

  MyDelete(url: string, reqOpts ?: any, requireAuth: boolean = true, where ?: string) {
    if (where) {
      reqOpts.params.set('where', where);
    }
    return this.MyRequest('delete', url, reqOpts, requireAuth)
  }

}
