import { Injectable } from '@angular/core';
import { IData } from './app.model';
@Injectable()
export class AppService {
  // data: IData[] = [
  //   {
  //     name: 'Housework-2020-11-12',
  //     descreption: 'abcd',
  //     dueDate: '2020-11-12',
  //     piority: 'normal',
  //     isOpenDetail: false,
  //     id: this.genId()
  //   },
  //   {
  //     name: 'Study-2020-11-15',
  //     descreption: 'ab33cd',
  //     dueDate: '2020-11-15',
  //     piority: 'hight',
  //     isOpenDetail: false,
  //     id: this.genId()
  //   }
  // ];

  constructor() {
    // this.setDataToLocal(this.data);
  }

  getListData(): IData[] {
    // if () {}
    const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
    this.sortDataByDate(data);
    return data;
  }

  setDataToLocal(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  clearLocal() {
    localStorage.clear();
  }

  genId() {
    return Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
  }

  sortDataByDate(data) {
    data.sort(function sort(a, b) {
      const dateA = (new Date(a.dueDate)).getTime();
      const dateB = (new Date(b.dueDate)).getTime();
      return dateB - dateA;
    });
  }
}
