import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ModalContentPolicyComponent} from "./modal-content-policy.component";
import {PolicyService} from "../policy.service";
import {ServerService} from "../../server/server.service";

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  providers: [BsModalRef]
})
export class PolicyListComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  rows = new Array();

  datas: any;

  constructor(private _service: PolicyService,
              private _services: ServerService,
              private _router: Router,
              private modalService: BsModalService,
              private bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.setPage();
  }

  refresh() {
    this.setPage();
    // this.toastr.success('列表数据刷新完成!', '');
  }

  edit(row) {
    this._router.navigate(['pages', 'policy', 'secrules', row.name]);
  }

  delete(row) {
    console.log(row);
    const that = this;
    if (window.confirm('确定要删除该项么?')) {
      this._service.deletePolicy(row.name)
        .subscribe(data => {
            setTimeout(function () {
              that.setPage();
            }, '1000');
            // that.toastr.success('删除成功！');
          },
          error => {
            // that.toastr.error('删除失败！已被引用！');
          }
        )
    }
  }

  setPage() {
    this.rows = [];
    this._service.getPolicyAll().subscribe(data => {
      this.rows = data;
      this.loadingIndicator = false;
    });
  }

  create() {
    const datas = {
      result: {
        name: "",
        shared: false,
        config: {
          twaf_secrules: {
            state: true,
            reqbody_state: true,
            reqbody_limit: 131072,
            body_filter_state: false,
            respbody_limit: 128,
            intelligent_behavior_detection: true,
            disable_vars: ["REQBODY_ERROR", "MULTIPART_STRICT_ERROR"],
            action: 'deny',
            protection_level: 9,
            action_meta: "403"
          },
          twaf_anti_hotlink: {
            state: false,
            mode: 'referer',
            action: 'deny',
            action_meta: "403",
            uri_ext: ["html", "js", "css", "txt", "jsp", "png"],
            exclude: [],
            entry: []
          },
          twaf_limit_conn: {
            state: true,
            trigger_thr: {
              req_flow_max: 314572800,
              req_count_max: 10000
            },
            clean_thr: {
              req_max: 50,
              new_conn_max: 40,
              conn_max: 100,
              uri_frequency_max: 3000
            },
            action: 'reset_connection',
            action_meta: "403"
          },
          twaf_anti_mal_crawler: {
            state: true,
            force_scan_robots_state: true,
            action: 'deny',
            action_meta: "403"
          },
          twaf_cookie_guard: {
            state: false,
            anti_tamper_state: true,
            anti_tamper_mode: "suffix",
            anti_tamper_exclude: [],
            crypt_state: false,
            crypt_exclude: [],
            action: 'deny',
            action_meta: "403",
            cookie: {Secure: false, HttpOnly: false},
            cookie_key: "cookieguard"
            // http_only_state: true
          },
          twaf_attack_response: {
            detail_state: false
          },
        }
      }
    };
    const initialState = {
      datas: datas,
      // toastr: this.toastr,
      thats: this
    };
    this.bsModalRef = this.modalService.show(
      ModalContentPolicyComponent,
      Object.assign(
        {initialState},
        {class: 'modal-lg'}
      )
    );
    this.bsModalRef.content.title = '添加策略';
    this.bsModalRef.content.closeBtnName = '关闭';
  }

}
