import { MonoTypeOperatorFunction, OperatorFunction, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

export function isTruthy<T>(): OperatorFunction<T, NonNullable<T>> {
  return filter<T, NonNullable<T>>(<T>(value: T): value is NonNullable<T> =>
    Boolean(value)
  );
}
