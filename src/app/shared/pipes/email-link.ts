import {Pipe} from "@angular/core";

@Pipe({
	name : "emailLink"
})

export class EmailLink{
	transform(value){
		if (value.length > 0) {
			return "mailto:" + value.replace(/ /g, "");
		}else{
			return '';
		}


	}
}
