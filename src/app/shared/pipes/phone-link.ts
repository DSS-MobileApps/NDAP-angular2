import {Pipe} from "@angular/core";

@Pipe({
	name : "phoneLink"
})

export class PhoneLink{
	transform(value){
		if (value != null && value.length > 0) {
			return "tel:" + value.replace(/ /g, "");
		}else{
			return '';
		}


	}
}
