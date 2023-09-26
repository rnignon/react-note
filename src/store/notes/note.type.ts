export enum NotePriority {
  HIGH,
  MID,
  LOW,
}

export interface Note {
  id: string;
  tag: string[];
  priority: number;
  background: string;
  title: string;
  content: string;
  date: string;
  time: number;
  pinned: boolean;
}
