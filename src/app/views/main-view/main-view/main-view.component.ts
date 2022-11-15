import { describe } from 'node:test';
import { Constant } from './../../../shared/constants/constant.class';
import { NotificationService } from './../../../service/notification.service';
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
import { TaskService } from '../../../service/task.service';
import { BoardService } from '../../../service/board.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  providers: [WorkspaceService, TaskService, BoardService, NotificationService],
})
export class MainViewComponent implements OnInit {
  isEditing: boolean = false;
  curTaskId: number = 0;
  lstWorkSpace: any[] = [];
  lstTicket: any[] = [];
  lstTask: any[] = [];
  isVisibleDetail: boolean = false;
  isVisibleAdd: boolean = false;
  boardId: String = '';
  selectedTask: any;
  form: FormGroup;

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

  columnStatus = [
    {
      name: 'Backlog',
      status: 0,
      tasks: [],
    },
    {
      name: 'To do',
      status: 1,
      tasks: [],
    },
    {
      name: 'Doing',
      status: 2,
      tasks: [],
    },
    {
      name: 'Done',
      status: 3,
      tasks: [],
    },
  ];

  constructor(
    private workspaceService: WorkspaceService,
    private taskService: TaskService,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];
      this.getAllTaskByBoard(this.boardId);
    });
    this.form = this.fb.group({
      id: [null],
      boardID: [null],
      describe: [null],
      status: [null]
    });
  }

  getAllBoardByWS() {
    // const workspaceId = '635a4342d33b9b9992200bd0';
    // new Promise((resolve, reject) => {
    //   this.ticketService.getAllTicketByWS(workspaceId).subscribe(
    //     (res: any) => {
    //       let tickets = [];
    //       res.forEach((elm) => {
    //         tickets.push(elm.tickets);
    //       });
    //       console.log(tickets);
    //       resolve(tickets);
    //     },
    //     (error) => {}
    //   );
    // }).then((data: any[]) => {
    //   console.log(data);
    //   let tasks = [];
    //   data.forEach((elm) => {
    //     this.taskService.getAllTaskByTicket(elm.id).subscribe((res) => {
    //       console.log(res);
    //     });
    //   });
    // });
  }

  getAllTaskByBoard(id) {
    this.columnStatus = [
      {
        name: 'Backlog',
        status: 0,
        tasks: [],
      },
      {
        name: 'To do',
        status: 1,
        tasks: [],
      },
      {
        name: 'Doing',
        status: 2,
        tasks: [],
      },
      {
        name: 'Done',
        status: 3,
        tasks: [],
      },
    ];
    this.lstTask = []
    this.boardService.getBoardById(id).subscribe(
      (res: any) => {
        if (res !== null) {
          this.lstTask = res[0].tasks;
          this.columnStatus.forEach(col =>
            this.lstTask.forEach(task => {
              if (col.status == task.status) {
                col.tasks.push(task)
              }
            })
          )
          console.log('lstColumn', this.columnStatus);
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

  showModalUpdate(data) {
    this.isVisibleDetail = true;
    this.form.patchValue({
      id: data._id,
      boardID: this.boardId,
      describe: data.describe,
      status: data.status
    })
    console.log(this.form.value);

  }

  showModalAdd(status) {
    this.isVisibleDetail = true;
    this.form.patchValue({
      id: '',
      boardID: this.boardId,
      describe: '',
      status: status
    })
  }

  handleOk(): void {
    const formValue = {
      task: this.form.value
    };
    console.log(formValue);

    if (formValue.task.id == '') {
      delete formValue.task.id;
      this.taskService.addTask(formValue).subscribe(res => {
        if (res.ret && res.ret[0].code !== 0) {
          this.notificationService.showNotification(Constant.ERROR, res.ret[0].message);
          formValue.task.id = 0;
        } else {
          this.getAllTaskByBoard(this.boardId);
          this.isVisibleDetail = false;
          this.notificationService.showNotification(Constant.SUCCESS, Constant.MESSAGE_ADD_SUCCESS);
        }
      }, error => {

      });
    } else {
      let id = formValue.task.id
      delete formValue.task.id;
      delete formValue.task.boardID;
      this.taskService.updateTask(id, formValue).subscribe(res => {
        // console.log('res', res);
        if (res.ret && res.ret[0].code !== 0) {
          this.notificationService.showNotification(Constant.ERROR, res.ret[0].message);
        } else {
          this.getAllTaskByBoard(this.boardId);
          this.isVisibleDetail = false;
          this.notificationService.showNotification(Constant.SUCCESS, Constant.MESSAGE_UPDATE_SUCCESS);
        }
      }, error => {

      });
      console.log('Button ok clicked!');

    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDetail = false;
    this.isVisibleAdd = false;
  }
}
