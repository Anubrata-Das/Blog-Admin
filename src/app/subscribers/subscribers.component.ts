import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscriberArray:any;

  constructor(private subService:SubscribersService){}

  ngOnInit(): void {
    this.subService.loadData().subscribe(val =>{
        this.subscriberArray=val;
    })
  }

  onDelete(id:any){
    this.subService.deleteData(id);
  }

}
