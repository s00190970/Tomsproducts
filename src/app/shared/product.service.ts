import { Injectable } from '@angular/core';
import {IProduct} from '../product-list/product';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';



@Injectable()
export class ProductService {
    private _productUrl = 'http://localhost:3000/products';
    
    // Service wrapper around the native Firestore SDK's
    // CollectionReference and Query types
    productsCollection: AngularFirestoreCollection<IProduct>;

    // A representation of any set of Products over any amount of time
    products: Observable<IProduct[]>;

    // Array to hold all products
    allProducts: IProduct[];
    errorMessage: string;
    

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
      // Connect to the database
      this.productsCollection = _afs.collection<IProduct>("products");
    }


  getProducts(): Observable<IProduct[]> {
    this.products = this.productsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as IProduct;
            console.log("getProducts:data" + JSON.stringify(data));
            const id = a.payload.doc.id;
            console.log("getProducts:id = "+id);
            return{id, ...data};
        }))
    );
    return this.products;
  }

  addProduct (product: IProduct): void {
    this.productsCollection.add(product);   
  }

  deleteProduct(id:string): void{
    this.productsCollection.doc(id).delete()
    .catch(error=>{console.log("deleteProduct error:"+error);})
    .then(() => console.log("deleteProduct: id = "+id));
  }

  addAllProducts(){
      this._http.get<IProduct[]>(this._productUrl).subscribe(
          products => {
              this.allProducts = products;
              for(let product of this.allProducts){
                  console.log("Adding:" + product.productName);
                  this.productsCollection.add(product);
              }
          },
          error => (this.errorMessage = <any>error)
      );
  }

  
}
