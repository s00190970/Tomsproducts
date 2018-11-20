import { Component } from '@angular/core';
import { IProduct } from '../product-list/product';
import { ProductService } from '../shared/product.service';
import { Router } from "@angular/router";
import * as faker from 'faker';

declare var require: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  pageTitle: string = "Add new Product";
  model: any = {};
  showDisplayClipartComponent: boolean;
  
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  imageStr:string;

  constructor(private _productService:ProductService, private router: Router){

  } 

  //controls hiding the component until the button is pressed
  showHideDisplayClipartComponent():boolean{
    this.showDisplayClipartComponent = !this.showDisplayClipartComponent;
    return false;
  }

  //receives the URL string from the display-cipart component
  //displays in the text box
  addImageStringToFormTextBox(evt):boolean{
    this.imageUrl = evt;
    return false;
  }

  submitProduct(){
   
    let submittedProduct: IProduct =
      {
        productName: this.productName,
        productCode: this.productCode,
        releaseDate: this.releaseDate,
        description: this.description,
        price: this.price,
        starRating: this.starRating,
        imageUrl: this.imageUrl,

      };
    this._productService.addProduct(submittedProduct);

    //redirect to the product-list component
    this.router.navigate(['/product-list']); 
    }

    addMockData():void{
      var faker = require('faker');
      let date = faker.date.past().toUTCString().substring(5,17);
      this.productName = `Mock ${faker.commerce.productName()}`;
      this.productCode = this.randomProductCodeGenerator();
      this.releaseDate = date;
      this.description = faker.lorem.words();
      this.price = Math.floor(Math.random() * 500) + 1;
      this.starRating = Math.floor(Math.random() * 5) + 1;
      this.imageStr = this.productName.substring(this.productName.lastIndexOf(' ')+1);
    }

    randomProductCodeGenerator():string{
      let output = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for(let i=0;i<4;i++){
        output+=possible.charAt(Math.floor(Math.random() * possible.length));
      }
      output+=" ";
      for(let i=0;i<4;i++){
        output+=(Math.floor(Math.random() * 10)).toString();
      }
      return output;
    }
    
  }
