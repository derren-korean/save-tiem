import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  constructor() { 
    debugger;
  }

  ngOnInit() {
    debugger;
    console.log("탬플릿");
  }

}

// <ion-header>
//   <ion-toolbar>
//   <ion-title>
//   ToDo App
//   </ion-title>
//   </ion-toolbar>
//   </ion-header>
//   <ion-content padding>
//   <ion-item>
//   <ion-input type="text" placeholder="Enter task"
//   [(ngModel)]="taskName"></ion-input>
  
//   <div class="item-note" item-end>
//   <ion-button color="primary" (click)="addTask()">
//   <ion-icon name="add"></ion-icon>
//   </ion-button>
//   </div>
//   </ion-item>
//   <div padding>
//   <ion-list>
//   <ion-item *ngFor="let todo of taskList; let i = index">
//   {{todo}}
//   <div class="item-note" slot="end">
//   <ion-button color="danger" clear (click)="deleteTask(i)">
//   <ion-icon name="trash"></ion-icon>
//   </ion-button>
//   </div>
//   </ion-item>
//   </ion-list>
//   </div>
//   </ion-content>
