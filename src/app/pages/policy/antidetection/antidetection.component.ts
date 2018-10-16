import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PolicyClass} from "../policy.class";
import {PolicyService} from "../policy.service";

@Component({
  selector: 'app-antidetection',
  templateUrl: './antidetection.component.html',
  styleUrls: ['./antidetection.component.css']
})
export class AntidetectionComponent implements OnInit {
    _id: string
    detection_uri_white_list: any;
    robot_uri_white_list: any;
    datas: PolicyClass = new PolicyClass();
    headers: any = [];
  robot_action_list = [
    {'name': '拦截并发送响应码', 'value': 'deny'},
    {'name': '重定向', 'value': 'redirect'},
    {'name': '连接重置', 'value': 'reset_connection'},
    {'name': '放行', 'value': 'pass'},
  ];
  detection_action_list = [
    {'name': '拦截并发送响应码', 'value': 'deny'},
    {'name': '重定向', 'value': 'redirect'},
    {'name': '连接重置', 'value': 'reset_connection'},
    {'name': '放行', 'value': 'pass'},
    {'name': '人机识别', 'value': 'robot'},
  ];
  crawler_action_list = [
    {'name': '拦截并发送响应码', 'value': 'deny'},
    {'name': '重定向', 'value': 'redirect'},
    {'name': '连接重置', 'value': 'reset_connection'},
    {'name': '放行', 'value': 'pass'},
  ];
  mode_list = [
    {'name': 'captcha', 'value': 'captcha'},
    {'name': 'js', 'value': 'js'},
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
        })
      }
    });
  }

  setStateCrawlerState(value) {
    this.datas.config.twaf_anti_mal_crawler.state = value;
  }

  submit(form) {
    const that = this;
    this._service.setPolicy(this._id, this.datas).subscribe(
        res => {
          if (res['_status']) {
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
