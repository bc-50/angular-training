import { Component, EventEmitter, Output } from '@angular/core';
import { AccountsService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  constructor(private loggingService: LoggingService, private accountSerice: AccountsService) {
    this.accountSerice.statusUpdated.subscribe((status: string) => alert("New StATUS " + status));
  }
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountSerice.addAccount(accountName, accountStatus);
    //this.loggingService.logStatusChange(accountStatus)
    //console.log('A server status changed, new status: ' + accountStatus);
  }
}
