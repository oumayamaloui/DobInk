import { signal, Signal } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
export function toSignal(value: any): Signal<any> {
  return signal(value);
}
