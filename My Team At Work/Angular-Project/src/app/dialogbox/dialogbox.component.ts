import { Component } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
// import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent {

  employee: any;


  constructor(){
  }

  public dialogcall(): void {
    // this.admincomp.delete();
  }

}
