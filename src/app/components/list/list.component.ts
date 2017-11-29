import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Coffee } from '../../logic/Coffee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private data: DataService,
              private router: Router) { }

  list: [Coffee];

  ngOnInit() {
    // Get list of coffee
    this.data.getList(list => {
      console.log(list);
      this.list = list;
    });
  }

  /**
   * Edit coffee details
   * @param {Coffee} coffee 
   */
  editDetails(coffee: Coffee) {
    this.router.navigate(["/coffee", coffee._id]);
  }

}
