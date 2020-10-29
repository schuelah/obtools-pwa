import { MatPseudoCheckboxState } from '@angular/material/core';

export class CalcTools {
  static calcTerm(coefficient: number, variable: number, defaultValue: number): number {
    if (isNaN(variable) || variable < 0) {
      return defaultValue * coefficient;
    }

    return coefficient * variable;
  }

  static cycleTerm(term: number, count?: number, allowUndefined?: boolean): number {
    const defaultNumber = (count === undefined ? 1 : 0);

    if (term < defaultNumber) {
      return defaultNumber;
    }

    if (count !== undefined && term + 1 < count) {
      return term + 1;
    }

    return 0;
  }

  static getState(term: number): MatPseudoCheckboxState {
    if (term < 0) {
      return 'indeterminate';
    }

    if (term === 0) {
      return 'unchecked';
    }

    return 'checked';
  }
}

export function asBoolOrNull(value: string) {
  if (value === null || value === '') {
    return null;
  }

  return (value === 'true');
}

export function filterNull<T>(o: T): Partial<T> {
  const result: Partial<T> = {};

  Object.keys(o).forEach(key => {
    if (o[key] !== null) {
      result[key] = o[key];
    }
  });

  return result;
}

export function filterZero<T>(o: T): Partial<T> {
  const result: Partial<T> = {};

  Object.keys(o).forEach(key => {
    if (o[key] !== 0) {
      result[key] = o[key];
    }
  });

  return result;
}
