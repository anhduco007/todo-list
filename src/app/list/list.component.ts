import { IData } from './../services/app.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  input$: Subject<string> = new Subject<string>();
  data: IData[];

  itemsOnAction: number[] = [];
  constructor(
    private appService: AppService
  ) {
  }

  ngOnInit() {
    this.data = this.getListData();
    this.searchByTitle();
  }

  searchByTitle() {
    this.input$
      .pipe()
      .subscribe(res => {
        if (res) {
          this.data = this.getListData().filter((x: IData) => x.name.toLocaleLowerCase().indexOf(res.toLocaleLowerCase()) !== -1);
        } else {
          this.data = this.getListData();
        }
      });
  }

  getListData(): IData[] {
    return this.appService.getListData();
  }

  update(data, index: number) {
    this.data[index] = data;
  }

  remove(index: number, id: number) {
    this.data.splice(index, 1);
    this.itemsOnAction = this.itemsOnAction.filter(x => x !== id);
    this.appService.setDataToLocal(this.data);
  }

  multiRemove() {
    this.appService.clearLocal();
    this.data.forEach((item, index) => {
      if (this.itemsOnAction.includes(item.id)) {
        this.itemsOnAction = this.itemsOnAction.filter(x => x !== item.id);
        this.data = this.data.filter(x => x.id !== item.id);
      }
    });
  }

  onCheck(value, index: number) {
    value.target.checked ? this.itemsOnAction.push(this.data[index].id) : this.itemsOnAction = this.itemsOnAction.filter(x => x !== this.data[index].id);
  }
}
