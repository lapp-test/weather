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
    // this.getWeatherDatas();
    // this.weatherDatas$.subscribe(res => {
    //   this.datas = res;
    // });
  }

  // get weatherDatas$() {
  //   return this.weatherDatas.asObservable();
  // }

  // getWeatherDatas() {
  //   if (localStorage.getItem('weather-datas')) {
  //     this.weatherDatas.next(localStorage.getItem('weather-datas'));
  //   }
  // }

  ngOnInit(): void {
    // const test = 5 / 9 * (303.15 - 32);
    // const test = 9 / 5 * (303.15 + 32);
    // console.log(test);
    if (localStorage.getItem('weather-datas')) {
      this.datas = JSON.stringify(localStorage.getItem('weather-datas'));
    }
  }
  getSelectedWeather(datas) {
    // console.log(datas);
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
        // console.log(this.fiveDays);
      }
      this.spinner = false;
    }, error => {
      this.authService.showSnackbar('city not found', 'error');
      this.spinner = false;
    });
  }
  getCelcius(f: number) {
    return Math.round((f - 273.15)).toFixed(2);
    // return 5 / 9 * (f - 32);
  }
  searchWeather(val) {
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
      this.authService.getMethod('/weather', params).subscribe(res => {
        if (res) {
          this.spinner = false;
          if (this.datas.length === 0) {
            this.datas.unshift(res);
          } else {
            this.checkExists(res);
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
        this.datas.unshift(row);
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
  async checkExists(data) {
    await this.datas.map(row => {
      if (row.name !== data.name) {
        if (this.datas.length > 8) {
          this.datas.pop();
        }
        this.datas.unshift(data);
      } else {
        this.authService.showSnackbar('City Already in Lists', 'error');
      }
    });
  }
  deleteAll() {
    if (confirm('Are you sure you want to delete all?')) {
      this.datas = [];
    }
  }

}
