import { Component,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.css']
})
export class ProductcrudComponent {
  ProductArray : any[] = [];
  currentProductID = "";

  name: string ="";
  categary: string ="";

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  restService: any;


  constructor(private http: HttpClient ,private service:RestService)
  {
    this.getAllProduct();
  }


  getAllProduct() {

    this.http.get("http://localhost:4000/user/getAll")
    .subscribe((resultData: any)=>
    {

        console.log(resultData);
        this.ProductArray = resultData.data;
    });


  }

  setUpdate(data: any)
  {
   this.name = data.name;
   this.categary = data.categary;


   this.currentProductID = data._id;

  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "categary" : this.categary,


    };

    this.http.patch("http://localhost:4000/user/update"+ "/"+this.currentProductID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Updateddd")
        this.getAllProduct();

    });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:4000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Deletedddd")
        this.getAllProduct();

    });
    }

  save()
  {
    if(this.currentProductID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }

  }

register()
  {

    let bodyData = {
      "name" : this.name,
      "categary" : this.categary,

  };
    this.http.post("http://localhost:4000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Successfully")
         //this.getAllProduct();
        this.name = '';
        this.categary = '';

        this.getAllProduct();
    });

  }
  ngOnInit(): void {
    this.fetchPosts();
  }
  fetchPosts(): void {
    this.restService.getAllPosts().subscribe(
      (response: any) => {
        this.POSTS = response;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }

}

