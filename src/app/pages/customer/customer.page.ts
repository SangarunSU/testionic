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
    public alertCtrl: AlertController) {
    this.dataService.loadAllData().subscribe(res => {
      this.datalist = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
  }

  async showedit(item: any) {
    let alert = this.alertCtrl.create({
      header: 'Edit',
      subHeader: 'Fill the form',
      inputs: [
        {
          name: 'inpname',
          placeholder: 'product name',
          value: item.productname
        },
        {
          name: 'inprice',
          placeholder: 'price',
          value: item.price
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: (data) => {
            const CustomerData : CustomerData = {
              fullname: data.inpname,
              ispostpaid: data.inpispostpaid,
              price: data.inprice,
              telno: data.intelno
            }
            this.dataService.createData(CustomerData);
              }
            }

          }//hadler
        }
      ]
    });
    (await alert).present();
  }






}
