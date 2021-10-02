import { Component } from '@angular/core';
import { CustomerService } from './services/customer.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angulaFrontEnd';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  productName: any;
  products:any = []
  imageBaseUrl = environment.imageBaseUrl
  constructor(private service: CustomerService) {

    this.fetchProducts()

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: any) {
    this.croppedImage = image;
    console.log(this.croppedImage);
  }

  createProduct() {
  
    const blob = this.DataURIToBlob(this.croppedImage.base64);
    const image = new File([blob], `image_${new Date().getMilliseconds()}.png`);
    const formaData = new FormData();
    formaData.append('name', this.productName);
    formaData.append('image', image);
    this.service.productCreate(formaData).subscribe(
      (res: any) => {
        Swal.fire('Product Created SuccessFully');
        this.fetchProducts()
        this.croppedImage = ""
        this.productName = ""
        this.imageChangedEvent = ''
      },
      (err) => {
        Swal.fire('Product failed to create');
      }
    );
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  fetchProducts(){

    this.service.productList().subscribe((res:any)=>{
       this.products = res.data
    },(err)=>{
      Swal.fire('Products failed to fetch')
    })

  }
}
