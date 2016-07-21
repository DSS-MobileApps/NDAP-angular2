import {Pipe} from "@angular/core";

@Pipe({
	name : "commaSplitList"
})

export class CommaSplitList{
	transform(value){
		if (value != null && value.length > 0) {
			var arrayOfStrings = value.split(',').map(element => {
			  return "<li>" + element.trim() + "</li>";
			});
			return arrayOfStrings.join('');
		}else{
			return '';
		}


	}
}
