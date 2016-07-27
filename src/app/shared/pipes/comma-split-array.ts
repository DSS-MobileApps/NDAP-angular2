import {Pipe} from "@angular/core";

@Pipe({
	name : "commaSplitArray"
})

export class CommaSplitArray{
	transform(value){
		if (value != null && value.length > 0) {
			var arrayOfStrings = value.split(',');
			return arrayOfStrings;
		}else{
			return [];
		}


	}
}
