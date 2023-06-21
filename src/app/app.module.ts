import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewNodeComponent } from './new-node/new-node.component';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { FolderNodeComponent } from './folder-node/folder-node.component';
import { FileNodeComponent } from './file-node/file-node.component';

@NgModule({
  declarations: [
    AppComponent,
    NewNodeComponent,
    FolderNodeComponent,
    FileNodeComponent,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
