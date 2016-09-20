import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name : "commaSplitArray"
})

export class CommaSplitArray implements PipeTransform {
	transform(value, args: string[]): any{
		if (value != null && value.length > 0) {
			var arrayOfStrings = value.split(',');
			return arrayOfStrings;
		}else{
			return [];
		}


	}
}
