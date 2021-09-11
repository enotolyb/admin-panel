import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
