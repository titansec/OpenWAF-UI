import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PolicyClass} from "../policy.class";
import {PolicyService} from "../policy.service";

@Component({
  selector: 'app-secrules',
  templateUrl: './secrules.component.html',
  styleUrls: ['./secrules.component.css']
})
export class SecrulesComponent implements OnInit {
  _id: string;
  datas: PolicyClass = new PolicyClass();

  tmp: any = [];
  protection_level_list = [
    {'name': '关键防护', 'value': '9'},
    {'name': '均衡防护', 'value': '5'},
    {'name': '全面防护', 'value': '1'},
  ];

  codeList = [
    {value: "400", text: "400"},
    {value: "401", text: "401"},
    {value: "403", text: "403"},
    {value: "404", text: "404"},
    {value: "405", text: "405"},
    {value: "410", text: "410"},
    {value: "500", text: "500"},
    {value: "501", text: "501"},
    {value: "503", text: "503"},
    {value: "504", text: "504"}
  ];

  constructor(
    private _router: Router,
    private _service: PolicyService,
    private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // 初始化表单数据
    this._activatedRoute.params.subscribe((params) => {
      this._id = params['_id'];
      if (this._id) {
        this._service.getPolicy(this._id).subscribe(data => {
          this.datas.config = data['result'];
          this.tmp.name = data['result']['name'];
          this.tmp.ignore_data = true;
          this.tmp.cookie_detect = true;
          if (data['result'].twaf_secrules.disable_vars.indexOf("REQBODY_ERROR") < 0) {
            this.tmp.ignore_data = false;
          }   // 不在数组中,即不失效 == 不丢弃异常请求
          if (data['result'].twaf_secrules.disable_vars.indexOf("REQUEST_COOKIES") >= 0) {
            this.tmp.cookie_detect = false;
          }  // 在数组中，不检测cookie中是否包含

        })
      }
    });
  }

  setStateSecrulesState(value) {
    this.datas.config.twaf_secrules.state = value;
  }

  submit() {
    this.datas.config.twaf_secrules.disable_vars = [];
    const that = this;
    if (this.tmp.ignore_data) {
      this.datas.config.twaf_secrules.disable_vars.push("REQBODY_ERROR");
      this.datas.config.twaf_secrules.disable_vars.push("MULTIPART_STRICT_ERROR");
    }
    if (!this.tmp.cookie_detect) {
      this.datas.config.twaf_secrules.disable_vars.push("REQUEST_COOKIES");
    }

    this._service.setPolicy(this._id, this.datas).subscribe(
      res => {
        if (res['success']) {
          // this.toastr.success('编辑成功！', '');
          // 延迟1s 后跳转至列表页面
          setTimeout(function () {
            that._router.navigate(['pages', 'policy']); // 为什么用that ： this容易找不到指代的是谁
          }, '1000');
        } else {
          // this.toastr.error('编辑失败！', '');
        }
      },
      error => {
        // this.toastr.error('编辑失败！', '');
      }
    )
  }
}
