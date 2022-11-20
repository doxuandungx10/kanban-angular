import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { WorkspaceService } from 'src/app/service/workspace.service';

// import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  providers: [WorkspaceService],
})
export class DefaultLayoutComponent {
  // public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  navItems: INavData[] = [
    {
      title: true,
      name: 'Workspace',
    },
  ];
  showSidebar: boolean = true;

  constructor(private workspaceService: WorkspaceService) {}
  ngOnInit() {
    this.getAllBoardByWS('635a4342d33b9b9992200bd0');
  }

  getAllBoardByWS(id) {
    this.showSidebar = false;
    this.workspaceService.getWSById(id).subscribe(
      (res: any) => {
        if (res !== null) {
          res[0].boards.forEach((el) =>
          this.navItems.push({
              name: el.name,
              url: `/board/${el._id}`,
              iconComponent: { name: 'cil-star' },
            })
            );
            console.log(this.navItems);
          }
          this.showSidebar = true;
        },
      (error) => {}
    );
  }
}
