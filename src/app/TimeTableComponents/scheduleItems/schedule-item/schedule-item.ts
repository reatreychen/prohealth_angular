import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-schedule-item',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './schedule-item.html',
  styleUrls: ['./schedule-item.css'],
})
export class ScheduleItem {
  @Input() data: any;

  // Each hour row equals 128px in the layout
  private readonly pxPerHour = 128;
  private readonly dayStart = '8:00 AM';

  // Robust parser: convert a time string like '9:00 AM' or '12:30 PM' to minutes since midnight
  private parseTimeToMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const s = timeStr.trim();
    // Expect formats like "9:00 AM" or "09:00 AM" or "9 AM"
    const parts = s.split(' ');
    let timePart = parts[0];
    let ampm = (parts[1] || '').toUpperCase();

    // If input comes as '09:00' without AM/PM, try to infer (treat as 24h)
    const colonIndex = timePart.indexOf(':');
    let hour = 0;
    let minute = 0;
    if (colonIndex >= 0) {
      const [h, m] = timePart.split(':');
      hour = parseInt(h || '0', 10);
      minute = parseInt(m || '0', 10);
    } else {
      hour = parseInt(timePart || '0', 10);
      minute = 0;
    }

    if (ampm === 'PM' && hour < 12) {
      hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
      // 12:xx AM is 00:xx
      hour = 0;
    }

    // If no AM/PM provided, assume the input is already in 24h format.
    if (!ampm) {
      // keep hour/min as parsed
    }

    return hour * 60 + minute;
  }

  getHeightPx(): number {
    const startMin = this.parseTimeToMinutes(this.data.start);
    const endMin = this.parseTimeToMinutes(this.data.end);
    const diffMin = Math.max(0, endMin - startMin);

    return (diffMin / 60) * this.pxPerHour;
  }

  getTopPx(): number {
    const startMin = this.parseTimeToMinutes(this.data.start);
    const baseMin = this.parseTimeToMinutes(this.dayStart);
    const diffMin = startMin - baseMin;

    // if negative, clamp to 0
    return Math.max(0, (diffMin / 60) * this.pxPerHour);
  }
}
