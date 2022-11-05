import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { IBoard } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { WorkspaceService } from '../../../service/workspace.service';
import { TicketService } from '../../../service/ticket.service';
import { TaskService } from '../../../service/task.service';
import { map, mergeMap } from 'rxjs/operators';
import { interval, of } from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  providers: [WorkspaceService, TicketService, TaskService],
})
export class MainViewComponent implements OnInit {
  isEditing: boolean = false;
  curTaskId: number = 0;
  lstWorkSpace: any[] = [];
  lstTicket: any[] = [];
  lstTask: any[] = [];
  isVisibleDetail: boolean = false;

  constructor(
    private workspaceService: WorkspaceService,
    private ticketService: TicketService,
    private taskService: TaskService
  ) {}

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      'Some random idea',
      'This is another random idea',
      'build an awesome application',
    ]),
    new Column('Research', [
      'Lorem ipsum',
      'foo',
      "This was in the 'Research' column",
    ]),
    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep',
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog',
    ]),
  ]);

  board2: IBoard = {
    name: 'Test Board',
    columns: [
      {
        name: 'Ideas',
        tasks: [
          {
            id: 1,
            name: 'Some random idea',
          },
          {
            id: 2,
            name: 'This is another random idea',
          },
          {
            id: 3,
            name: 'build an awesome application',
          },
        ],
      },
      {
        name: 'Research',
        tasks: [
          {
            id: 4,
            name: 'Lorem ipsum',
          },
          {
            id: 5,
            name: 'foo',
          },
          {
            id: 6,
            name: "This was in the 'Research' column",
          },
        ],
      },
    ],
  };

  ngOnInit() {
    this.getAllTicketByWS();
  }

  getAllTicketByWS() {
    const workspaceId = '635a4342d33b9b9992200bd0';
    // this.ticketService
    //   .getAllTicketByWS(workspaceId)
    //   .pipe(
    //     map((data: any) => {
    //       let tickets = [];
    //       data.forEach((element) => {
    //         tickets.push(element.tickets);
    //       });
    //       return of(tickets);
    //     }),
    //     mergeMap((data: any) =>
    //       this.getAllTaskByTicket(data);
    //     )
    //   )
    //   .subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       if (res !== null) {
    //         console.log(res);

    //         this.lstTicket = res[0].tickets;
    //         console.log('lstTicket', this.lstTicket);
    //         // for (let i = 0; i < this.lstTicket.length; i++) {
    //         //   this.taskService
    //         //     .getAllTaskByTicket(this.lstTicket[i].id)
    //         //     .subscribe(
    //         //       (res: any) => {
    //         //         if (res !== null) {
    //         //           this.lstTicket[i].push();
    //         //         }
    //         //       },
    //         //       (error) => {}
    //         //     );
    //         // }
    //         console.log('lstTicket', this.lstTicket);
    //       }
    //     },
    //     (error) => {}
    //   );

    new Promise((resolve, reject) => {
      this.ticketService.getAllTicketByWS(workspaceId).subscribe(
        (res: any) => {
          let tickets = [];
          res.forEach(elm => {
            tickets.push(elm.tickets)
          })
          console.log(tickets);
          resolve(tickets);
        },
        (error) => {}
      );
    }).then((data: any[]) => {
      console.log(data)
      let tasks = [];
      data.forEach(elm => {
        this.taskService.getAllTaskByTicket(elm.id).subscribe(res => {
          console.log(res);
        })
      })
    });
  }

  getAllTaskByTicket(id) {
    this.taskService.getAllTaskByTicket(id).subscribe(
      (res: any) => {
        if (res !== null) {
          this.lstTask = res[0].tasks;
          console.log('lstTask', this.lstTask);
        }
      },
      (error) => {}
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // method(data: any) {
  //   if (this.curTaskId == 0) {
  //     this.curTaskId = data.id;
  //   } else {
  //     this.curTaskId = 0;
  //   }
  //   this.isEditing = !this.isEditing;
  //   console.log('abc');
  // }

  showModalUpdate() {
    this.isVisibleDetail = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleDetail = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDetail = false;
  }
}
