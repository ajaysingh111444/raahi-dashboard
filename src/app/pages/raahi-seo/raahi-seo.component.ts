import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raahi-seo',
  templateUrl: './raahi-seo.component.html',
  styleUrls: ['./raahi-seo.component.css']
})
export class RaahiSeoComponent implements OnInit {
  arrays= Array(5);
  constructor() { }

  ngOnInit(): void {
  }
  tables = [
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },

  ]
  // Pie
  public pieChartLabels:string[] = ['Organic', 'Social', 'Refferal'];
  public pieChartData:number[] = [40, 20, 10];
  public pieChartType:any = 'pie';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
