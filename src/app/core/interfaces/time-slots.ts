export interface TimeSlots {
  time: string;
  action: number;  
  date: string;
  eventTitle?: string;  
  description?: string;  
}

export interface WeekDays {
  date: Date;
  label: string;
}

export interface EventItem {
  id: string;
  title: string;
  description?: string;
  timeSlot: TimeSlots;
}