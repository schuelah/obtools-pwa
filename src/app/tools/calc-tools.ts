export class CalcTools {
  static calcTerm(coefficient: number, variable: number, defaultValue: number): number {
    if (isNaN(variable) || variable < 0) {
      return defaultValue * coefficient;
    }

    return coefficient * variable;
  }
}
