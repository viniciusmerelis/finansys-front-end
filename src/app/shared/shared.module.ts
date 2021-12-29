import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MyInputNumberDirective } from '../core/directives/my-input-number.directive';

const maskConfig: Partial<IConfig> = {
  dropSpecialCharacters: true,
};

@NgModule({
  declarations: [
    PageHeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    MyInputNumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    NgxMaskModule
  ],
  exports: [
    //shared modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    NgxMaskModule,
    MyInputNumberDirective,

    //shared components
    PageHeaderComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
