import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><strong>Sponsor : </strong><a href="http://www.titansec.com.cn/" target="_blank"> 上海天泰网络技术有限公司</a></span>
    <div class="socials">
      <!-- <a href="https://github.com/titansec/OpenWAF" target="_blank" class="ion ion-social-github"></a> -->
      <span style="margin-right: 45px;">
      <a href='https://gitee.com/miracleqi/OpenWAF/stargazers' target="_blank"><img src='https://gitee.com/miracleqi/OpenWAF/badge/star.svg?theme=gray' alt='star'></a>
      </span>
    </div>
  `,
})
export class FooterComponent {
}
