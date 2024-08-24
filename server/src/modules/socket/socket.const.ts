export interface ISocketMessage {
  from: 'server' | number;
  event: string;
  content: any;
}