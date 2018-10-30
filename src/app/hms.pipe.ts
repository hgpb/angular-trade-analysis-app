import { Pipe, PipeTransform } from '@angular/core';
/*
 * Hour Minute Second Pipe
 * 00h 00m 00s
 *     00m 00s
*/
@Pipe({name: 'hms'})
export class HoursMinutesSecondsPipe implements PipeTransform {
  transform(millisec: number): string {
    //Get hours from milliseconds
    const hours = millisec / (1000*60*60);
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours.toString() : '0' + absoluteHours;
    //Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes.toString() : '0' +  absoluteMinutes;
    //Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = absoluteSeconds > 9 ? absoluteSeconds.toString() : '0' + absoluteSeconds;
    if (h === "00" && m === "00") return s + 's';
    else if (h === "00") return m + 'm ' + s + 's';
    else return h + 'h ' + m + 'm ' + s + 's';
  }
}
