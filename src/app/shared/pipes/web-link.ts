import { Pipe } from "@angular/core";

@Pipe({
	name: "webLink"
})

export class WebLink {
	transform(value: string) {
		if (value != null && value.length > 0) {
			if (value.indexOf('http://') > 0 || value.indexOf('https://') > 0) {
				return value;
			} else {

			}
			return "//" + value;
		} else {
			return '';
		}


	}
}
