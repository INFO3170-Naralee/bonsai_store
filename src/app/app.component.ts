import { Component } from '@angular/core';
import { Bonsai } from './bonsai/bonsai';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BonsaiDialogComponent } from './bonsai-dialog/bonsai-dialog.component';
import { BonsaiDialogResult } from './bonsai-dialog/bonsai-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bonsai-store';

  constructor(private dialog: MatDialog) {}

  bonsaiCollection: Bonsai[] = [
    {
      id: 1,
      title: 'Bonsai 1',
      description: 'Description of Bonsai 1',
      pictureLink: 'assets/images/bonsai_1.jpg',
    },
    {
      id: 2,
      title: 'Bonsai 2',
      description: 'Description of Bonsai 2',
      pictureLink: 'assets/images/bonsai_2.jpg',
    },
    {
      id: 3,
      title: 'Bonsai 3',
      description: 'Description of Bonsai 3',
      pictureLink: 'assets/images/bonsai_3.jpg',
    },
  ];

  shoppingCart: Bonsai[] = [];

  addBonsai(): void {
    const dialogRef = this.dialog.open(BonsaiDialogComponent, {
      width: '270px',
      data: {
        bonsai: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: BonsaiDialogResult | undefined) => {
        if (!result) {
          return;
        }

        console.log(Object.keys(result.bonsai).length);

        //If added Bonsai data don't have all required data, show alert
        if (Object.keys(result.bonsai).length < 3) {
          alert('Please type all data');
        } else {
          // If added Bonsai data have all required data, add it to bonsai collection array
          this.bonsaiCollection.push(result.bonsai);
        }
      });
  }

  editBonsai(list: 'bonsaiCollection' | 'shoppingCart', bonsai: Bonsai): void {
    const dialogRef = this.dialog.open(BonsaiDialogComponent, {
      width: '270px',
      data: {
        bonsai,
        enableDelete: true,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: BonsaiDialogResult | undefined) => {
        if (!result) {
          return;
        }
        const dataList = this[list];
        const bonsaiIndex = dataList.indexOf(bonsai);
        if (result.delete) {
          dataList.splice(bonsaiIndex, 1);
        } else {
          dataList[bonsaiIndex] = bonsai;
        }
      });
  }

  drop(event: CdkDragDrop<Bonsai[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
