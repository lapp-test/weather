import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {
  datas: any = [];
  cityName: string = null;
  citys: any = [];
  selectedWeather: any = [];
  fiveDays: any = [];
  spinner: any = false;
  private weatherDatas = new BehaviorSubject<any>([]);

  constructor(
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('weather-datas')) {
      this.datas = JSON.stringify(localStorage.getItem('weather-datas'));
    }
  }
  getSelectedWeather(datas) {
    this.selectedWeather = datas;
    this.callfivedays(datas.name);
  }
  callfivedays(name) {
    this.fiveDays = [];
    const params = {
      q: name,
      appid: 'c51223c219d6aec8cb8c5210449bd859'
    };
    this.spinner = true;
    this.authService.getMethod('/forecast', params).subscribe(res => {
      if (res) {
        this.fiveDays = res;
      }
      this.spinner = false;
    }, error => {
      this.authService.showSnackbar('city not found', 'error');
      this.spinner = false;
    });
  }
  getCelcius(f: number) {
    return Math.round((f - 273.15)).toFixed(2);
  }
  async searchWeather(val) {
    if (!val) {
      this.authService.showSnackbar('Please enter city name', 'error');
      return false;
    }
    this.spinner = true;
    if (val) {
      const params = {
        q: this.cityName,
        appid: 'c51223c219d6aec8cb8c5210449bd859'
      };
      await this.authService.getMethod('/weather', params).subscribe(res => {
        if (res) {
          this.spinner = false;
          if (this.datas.length === 0) {
            this.datas.unshift(res);
          } else {
            if (this.datas.length > 8) {
              this.datas.pop();
            }
            const isExists = this.checkExists(res);
            if (!isExists) {
              this.datas.unshift(res);
            }
          }
          this.cityName = null;
        }
      }, error => {
        this.authService.showSnackbar('city not found', 'error');
        this.spinner = false;
      }
    );
    } else {
      this.authService.showSnackbar('Please enter more than two characters', 'error');
    }
  }
  async delete(data) {
    const newDatas = [];
    await this.datas.map(row => {
      if (row.name !== data.name) {
        newDatas.push(row);
      } else {
        this.selectedWeather = [];
      }
    });
    this.datas = newDatas;
  }
  async refresh(data) {
    const params = {
      q: data.name,
      appid: 'c51223c219d6aec8cb8c5210449bd859'
    };
    await this.authService.getMethod('/weather', params).subscribe(res => {
      if (res) {
        this.spinner = false;
        const newDatas = [];
        this.datas.map(row => {
          if (row.name === res.name) {
            if (this.searchWeather.name === res.name) {
              this.getSelectedWeather(res);
            }
            newDatas.unshift(res);
          } else {
            newDatas.unshift(row);
          }
        });
        this.datas = newDatas;
      }
    }, error => {
      this.authService.showSnackbar('city not found', 'error');
      this.spinner = false;
    });
  }
  checkExists(data) {
    let isExists = false;
    this.datas.map(row => {
      if (row.name === data.name) {
        isExists = true;
        this.authService.showSnackbar('City Already in Lists', 'error');
      }
    });
    return isExists;
  }
  deleteAll() {
    if (confirm('Are you sure you want to delete all?')) {
      this.datas = [];
      this.selectedWeather = null;
      this.fiveDays = [];
    }
  }

}
