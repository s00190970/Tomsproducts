import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    
  pageTitle : string = "Tom's Products";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
  errorMessage: any;

  _listFilter: string;
  get listFilter(): string{
      return this._listFilter;
  }
  set listFilter(value: string){
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }


  filteredProducts: IProduct[];
  products: IProduct[] = [];

  toggleImage(): void{
      this.showImage = !this.showImage;
  }

  constructor(private _productService:ProductService){
      //_productService.addAllProducts();
}

  performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
  }

  onNotify(message:string): void{
    console.log(message);
  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(products =>{
        this.products = products,
        this.filteredProducts = this.products;
    },
    error => this.errorMessage = <any>error); 
}
deleteProduct(id:number): void{
    console.log("deleting product");
    this._productService.deleteProduct(id.toString());
}
  
}
