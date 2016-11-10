//file name: remove-spaces.ts
import { Pipe } from "@angular/core";

@Pipe({
	name: "removeSpaces"
})

export class RemoveSpaces {
	transform(value: string) {
		return value.replace(/ /g, "");
	}
}
