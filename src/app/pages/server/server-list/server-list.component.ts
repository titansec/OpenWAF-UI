import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

import {SmartTableService} from '../../../@core/data/smart-table.service';
import {PageClass} from "../../../@theme/model/page.class";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {ServerService} from "../server.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ModalContentRuleComponent} from "./modal-content-rule.component";
import {Urls} from "../../../@theme/const/url";

@Component({
  selector: 'ngx-server-list',
  templateUrl: './server-list.component.html',
  providers: [BsModalRef],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ServerListComponent implements OnInit {

  loadingIndicator: boolean = true;

  reorderable: boolean = true;

  page = new PageClass();
  rows = new Array();
  where: any = {};
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private service: SmartTableService,
              private _service: ServerService,
              private modalService: BsModalService,
              private bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.setPage();
  }

  setPage() {

    this._service.getAccessRuleList().subscribe(data => {
      console.log('data', data);
      this.rows = data['result'];
      this.loadingIndicator = false;
    });
  }

  refresh() {
    this.setPage();
    // this.toastr.success('列表数据刷新完成!', '');
  }

  create() {
    const serverDatas = {
      user: Urls.userName,
      port: '',
      host: '',
      path: '/',
      server_ssl: false,
      forward: 'test',
      forward_addr: '',
      forward_port: '',
      uuid: 'accessrule_' + new Date().getTime(),
      policy: ""
    };
    const initialState = {
      status: 'add',
      datas: serverDatas,
      // toastr: this.toastr,
      thats: this,
    };
    this.bsModalRef = this.modalService.show(
      ModalContentRuleComponent,
      Object.assign({initialState}, {class: 'modal-lg'})
    );
    this.bsModalRef.content.title = '添加站点';
    this.bsModalRef.content.closeBtnName = '关闭';
  }

  edit(row) {
    const serverDatas = {
      user: row['user'],
      port: row['port'],
      host: row['host'],
      path: row['path'],
      server_ssl: row['server_ssl'],
      forward: row['forward'],
      forward_addr: row['forward_addr'],
      forward_port: row['forward_port'],
      uuid: row['uuid'],
      policy: row['policy']
    };
    const initialState = {
      status: 'edit',
      datas: serverDatas,
      // toastr: this.toastr,
      thats: this,
    };
    this.bsModalRef = this.modalService.show(
      ModalContentRuleComponent,
      Object.assign({initialState}, {class: 'modal-lg'})
    );
    this.bsModalRef.content.title = '编辑站点';
    this.bsModalRef.content.closeBtnName = '关闭';
  }

  delete(row) {
    const that = this;
    if (window.confirm('确定要删除该项么?')) {
      this._service.deleteAccessRule(row.user, row.uuid)
        .subscribe(data => {
            setTimeout(function () {
              that.setPage();
            }, '1000');
            // that.toastr.success('删除成功！');
          },
          error => {
            // that.toastr.error('删除失败！');
          }
        )
    } else {

    }
  }
}
