import {Component, OnInit} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap";
import {PolicyService} from "../policy.service";

@Component({
  selector: 'app-modal-content-policy',
  templateUrl: './modal-content-policy.component.html',
})

export class ModalContentPolicyComponent implements OnInit {
  toastr: any;
  thats: any;
  datas: any;

  constructor(public bsModalRef: BsModalRef,
              private _service: PolicyService,
  ) {
  }

  ngOnInit() {
  }

  submit(form) {
    this._service.addPolicy(
      this.datas['result']['name'],
      {config: this.datas['result']['config']})
      .subscribe(
        data => {
          if (data['success']) {
            // this.toastr.success('防护策略添加成功！', '');
          } else {
            // this.toastr.error(data.message);
          }
          this.bsModalRef.hide();
          this.thats.setPage();
        },
        error => {
          // this.toastr.error('防护策略添加失败!', JSON.stringify(error.error._issues));
        })
  }
}
