import { MonoTypeOperatorFunction, OperatorFunction, pipe } from "rxjs";
import { filter } from "rxjs/operators";

export function isTruthy<T>(): OperatorFunction<T, T> {
	return pipe(
		filter(<T>(value: T) => Boolean(value) && value !== undefined && value !== null)
	);
}