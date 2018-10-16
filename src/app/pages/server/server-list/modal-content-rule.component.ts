import {Component, OnInit} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-modal-content-rule',
  templateUrl: './modal-content-rule.component.html',
})

export class ModalContentRuleComponent implements OnInit {
  toastr: any;
  status: string;
  datas: any;
  policy_list: any = [];
  thats: any;

  constructor(public bsModalRef: BsModalRef,
              private _service: ServerService,
  ) {
  }

  ngOnInit() {
    this._service.getPolicyAll()
      .subscribe(
        data => {
          for (let val in data['result']) {
            this.policy_list.push(
              {
                name: val,
                value: val
              }
            );
          }
          if (!this.datas.policy) {
            this.datas.policy = this.policy_list[0].value;
          }
        }
      );
    this.policy_list.push({name: 'twaf_policy_conf', value: 'twaf_policy_conf'});
  }

  submit(form) {
    let params = this.datas;
    if (this.status === 'add') {
      this._service.addAccessRule({'config': params}, this.datas.user)
        .subscribe(data => {
            if (data._status === 'OK') {
              // this.toastr.success('站点添加成功！', '');
            } else {
              // this.toastr.error(data.message);
            }
            this.bsModalRef.hide();
            this.thats.setPage();
          },
          error => {
            // this.toastr.error('站点添加失败！', '');
          })
    } else {
      this._service.setAccessRule({'config': params}, this.datas.user, this.datas.uuid)
        .toPromise()
        .then(data => {
            if (data._status === 'OK') {
              // this.toastr.success('站点更新成功！', '');
            } else {
              // this.toastr.error(data.message);
            }
            this.bsModalRef.hide();
            this.thats.setPage();
          },
          error => {
            // this.toastr.error('站点更新失败！', '');
          })
    }
  }

}
