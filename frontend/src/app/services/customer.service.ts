import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ 
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http: HttpClient) {



  }

  productCreate(params: any) {
    return this.http
      .post(environment.url + 'create', params)
  }
  productList() {
    return this.http
      .get(environment.url + 'list')
  }
}
