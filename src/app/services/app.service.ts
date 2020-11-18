import { Injectable } from '@angular/core';
import { IData } from './app.model';
@Injectable()
export class AppService {

  constructor() {
  }

  getListData(): IData[] {
    const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
    this.sortDataByDate(data);
    return data;
  }

  createData(body: IData) {
    const data: IData[] = this.getListData();
    data.push(body);
    this.clearLocal();
    this.setDataToLocal(data);
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
