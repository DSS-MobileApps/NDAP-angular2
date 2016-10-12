import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit, OnChanges {
   @Input() ErrorMsg: string;
  public ErrorMessageIsVisible: boolean;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes:any):void {
    if (changes.ErrorMsg){
        var errorChange: string = changes.ErrorMsg.currentValue;
        console.log('error message changed', errorChange);
        if (errorChange) {
          if (errorChange.length > 0){
            this.showErrorMessage(errorChange);
          }else{
            this.hideErrorMsg();
          }
        }
    }
  }


    showErrorMessage(msg: string)
    {
        this.ErrorMsg = msg;
        this.ErrorMessageIsVisible = true;
    }

    hideErrorMsg()
    {
        this.ErrorMessageIsVisible = false;
    }

}
