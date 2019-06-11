import { Component,OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'classificator';
  model:any;
  ngOnInit(): void {

  }

  async loadlModel(){
    this.model= await tf.loadGraphModel('./assets/model/model.json');
  }
}
