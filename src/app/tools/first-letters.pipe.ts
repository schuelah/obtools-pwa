import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetters'
})
export class FirstLettersPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (!value) { return ''; }

    return value.match(/\b(\w)/g).join('');
  }

}
