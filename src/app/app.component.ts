import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ashik-ui-app';
  flag: any = [];
  showrightnav: any = false;
  showLeftnav: any = true;
  public flags = [
    { name: 'English', image: 'assets/images/flags/gb.svg' },
    { name: 'French', image: 'assets/images/flags/fr.svg' },
  ];
  navItems: any[] = [
    {
      displayName: 'Home',
      iconName: 'recent_actors'
    },
    {
      displayName: 'Menu1',
      iconName: 'group'
    }
  ];
  ngOnInit() {
    this.flag = this.flags[0];
  }
  public changeLang(flag) {
    this.flag = flag;
  }
  showrightnavToggle() {
    // if (this.showrightnav) {
      this.showrightnav = !this.showrightnav;
    // }
  }
  showleftnavToggle() {
    this.showLeftnav = !this.showLeftnav;
  }
}
