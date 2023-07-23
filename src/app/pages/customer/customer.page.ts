import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CrudService, CustomerData } from './customer.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  datalist: CustomerData[]=[];
  alertCtrl: any;


  constructor(private dataService: CrudService,
    private modalCtrl: ModalController,
    private cd: ChangeDetectorRef,
    public alertController: AlertController) {
    this.dataService.loadAllData().subscribe(res => {
      this.datalist = res;
      this.cd.detectChanges();
    })
}

  ngOnInit() {
  }

async  AddData(){
    let alert = this.alertController.create({
      header: "ADD",
      inputs: [
      {
        name: "FullName",
        placeholder: "FullName",
      },
      {
        name: "Price",
        placeholder: "Price",
      },
      {
        name: "TellNo",
        placeholder: "TellNo",
      },
      {
        name: "ispostpaid",
        placeholder: "ispostpaid",
        type: "checkbox"
      }
    ],
      buttons: [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Add",
        handler: data => {
          const customerData:CustomerData = {
            fullname: data.FullName,
            price: data.Price,
            telno: data.TellNo,
            ispostpaid: data.ispostpaid
          }

          this.dataService.createData(customerData);
        }
      }
    ]
    });

    (await alert).present();
    
  }

  async DeleteData(customer: CustomerData){
    const alert = this.alertController.create({
      header: "Delete",
      message: "Finish",

      buttons: [
        {
          text: "Cancel",
          role: "cancel",         
        },

        {
          text: "OK",
          handler: () => {
            this.dataService.deleteData(customer)
            this.cd.detectChanges();
          }
          
        }
      ]
    });

    (await alert).present();
  }

  async EditData(customerEditData: CustomerData){
    const alert = this.alertController.create({
      header: "EDIT",
      inputs: [
      {
        name: "FullName",
        placeholder: "FullName",
      },
      {
        name: "Price",
        placeholder: "Price",
      },
      {
        name: "TellNo",
        placeholder: "TellNo",
      },
      {
        name: "ispostpaid",
        placeholder: "ispostpaid",
        type: "checkbox"
      }
    ],

    buttons: [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Edit",
        handler: data => {
          const customerEdit:CustomerData = {
            id: customerEditData.id,
            fullname: data.FullName,
            price: data.Price,
            telno: data.TellNo,
            ispostpaid: data.ispostpaid
          }

          this.dataService.editData(customerEdit);
        }
      }
    ]
    });
    (await alert).present();
  }



 
}


