import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    PasswordModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    SharedModule,
    SidebarModule,
    TabViewModule,
    TableModule,
    FieldsetModule
  ]
})
export class PrimengModule { }