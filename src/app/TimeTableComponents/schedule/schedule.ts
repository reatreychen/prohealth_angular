import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ScheduleItem } from '../scheduleItems/schedule-item/schedule-item';

interface ScheduleItemModel {
  day: string;
  start: string;
  end: string;
  department: string;
  doctors: string[];
  room?: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [NgForOf, ScheduleItem ,NgIf],
  templateUrl: './schedule.html',
  styleUrls: ['./schedule.css'],
})
export class Schedule {
  // Each hour row equals 128px in the layout (tailwind h-32 = 8rem = 128px)
  readonly pxPerHour = 128;

  timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM"
  ];

  // total container height for each day column (px)
  get totalHeightPx(): number {
    return this.timeSlots.length * this.pxPerHour;
  }

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  schedule: ScheduleItemModel[] = 

  [
    {
      day: "Monday",
      start: "8:00 AM",
      end: "9:00 AM",
      department: "Pediatric Department",
      doctors: ["Dr. Sarah Patel", "Dr. David Nguyen"],
    },
    {
      day: "Monday",
      start: "9:00 AM",
      end: "11:00 AM",
      department: "Cardiology",
      doctors: ["Dr. Emily Chen", "Dr. Mark Thompson"],
    },

    {
      day: "Monday",
      start: "2:00 PM",
      end: "5:00 PM",
      department: "Cardiology",
      doctors: ["Dr. Emily Chen", "Dr. Mark Thompson"],
    },

    {
      day: "Tuesday",
      start: "8:00 AM",
      end: "10:00 AM",
      department: "Orthopedics",
      doctors: ["Dr. James Carter"],
    },
    {
      day: "Tuesday",
      start: "1:00 PM",
      end: "5:00 PM",
      department: "Dermatology",
      doctors: ["Dr. Karen Lopez", "Dr. Henry Brooks"],
    },
    {
      day: "Wednesday",
      start: "4:30 PM",
      end: "5:00 PM",
      department: "ENT Department",
      doctors: ["Dr. Lisa Gomez"],
    },
    {
      day: "Wednesday",
      start: "2:00 PM",
      end: "6:00 PM",
      department: "Neurology",
      doctors: ["Dr. Paul Robinson", "Dr. Olivia Kim"],
    },
    {
      day: "Thursday",
      start: "8:00 AM",
      end: "12:00 PM",
      department: "Radiology",
      doctors: ["Dr. Steven Clark"],
    },
    {
      day: "Friday",
      start: "9:00 AM",
      end: "12:00 PM",
      department: "Pediatric Department",
      doctors: ["Dr. Sarah Patel", "Dr. Emily Chen"],
    },
    {
      day: "Friday",
      start: "1:30 PM",
      end: "5:00 PM",
      department: "Cardiology",
      doctors: ["Dr. Mark Thompson"],
    },
    {
      day: "Saturday",
      start: "8:00 AM",
      end: "12:00 PM",
      department: "Emergency",
      doctors: ["Dr. David Nguyen"],
    },
    {
      day: "Saturday",
      start: "1:00 PM",
      end: "4:00 PM",
      department: "Orthopedics",
      doctors: ["Dr. James Carter", "Dr. Henry Brooks"],
    },
    {
      day: "Sunday",
      start: "9:00 AM",
      end: "12:00 PM",
      department: "Dermatology",
      doctors: ["Dr. Karen Lopez"],
    },
    {
      day: "Sunday",
      start: "1:00 PM",
      end: "5:00 PM",
      department: "General Medicine",
      doctors: ["Dr. Daniel Scott"],
    },
    {
      day: "Monday",
      start: "2:00 PM",
      end: "6:00 PM",
      department: "Neurology",
      doctors: ["Dr. Olivia Kim"],
    },
    {
      day: "Wednesday",
      start: "8:00 AM",
      end: "11:00 AM",
      department: "Cardiology",
      doctors: ["Dr. Mark Thompson", "Dr. Emily Chen"],
    },
    {
      day: "Thursday",
      start: "2:00 PM",
      end: "5:00 PM",
      department: "Emergency",
      doctors: ["Dr. David Nguyen", "Dr. Lisa Gomez"],
    },
    
    
  ]
  
}
