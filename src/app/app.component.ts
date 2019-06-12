import { Component,OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
const IMAGE_SIZE = 100;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements  OnInit {
  title = 'Fruit Clasificator';
  model: any;
  predictions:any;
  public imagePath;
  imgURL: any;
  public message: string;
  ngOnInit(): void {
 this.loadlModel();
  }

  async loadlModel(){
    this.model= await tf.loadLayersModel('./assets/model/model.json');
    
    console.log(this.model);
  }

  async predict(imageData: any) {
    
    
    await tf.tidy(() => {
      const img=tf.browser.fromPixels(imageData).toFloat;
      const offset = tf.scalar(127.5);
      // Normalize the image from [0, 255] to [-1, 1].
      const normalized = img.sub(offset).div(offset);

      // Reshape to a single-element batch so we can pass it to predict.
       const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
      const output = this.model.predict(batched) as any;
  
      // Save predictions on the component
      this.predictions = Array.from(output.dataSync()); 
      console.log(this.predictions);
    });
  
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      console.log(reader);
      this.imgURL = reader.result;
      console.log(this.imgURL) 
      this.predict(files);
    }
  }
}
