import { Component, Input, OnInit, OnChanges, SimpleChanges, DoCheck, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges {
  @Input("srvElement") element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild("heading", { static: true }) header: ElementRef;
  @ContentChild("contentPara", { static: true }) contentPara: ElementRef;
  constructor() { }

  ngOnInit(): void {
    console.log(this.header);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
