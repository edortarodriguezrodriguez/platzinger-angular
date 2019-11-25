export enum Status {
  Online = 'online',
  Offline = 'offline',
  Busy = 'busy',
  Away = 'away'
}

export interface User {
  nick: string;
  subnick?: string;
  age?: number;
  email: string;
  friend: boolean;
  uid: any;
  status: Status
}
