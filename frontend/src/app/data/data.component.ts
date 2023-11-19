import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  visitors: any[] = [];
  constructor(
    private dataService: DataService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadVisitor();
    this.commonService.refreshData$.subscribe(() => {
      this.loadVisitor();
    });
  }

  loadVisitor() {
    this.dataService.getVisitors().subscribe((data) => {
      this.visitors = data;
    });
  }

  editVisitor(id: String) {
    const user = this.visitors.find((visior) => visior._id === id);
    console.log(user);
    this.commonService.sendUserData(user);
  }

  deleteVisitor(id: string) {
    const isConfirmed = confirm(
      'Are you sure you want to delete this visitor?'
    );
    if (isConfirmed) {
      this.dataService.deleteVisitor(id).subscribe(() => {
        this.loadVisitor();
      });
    }
  }
}
