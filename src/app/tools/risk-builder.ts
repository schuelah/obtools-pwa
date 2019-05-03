export class RiskBuilder {
  risks: Array<string> = [];

  constructor() {
  }

  public addSimpleTerm(value: number, unknownWording: string, positiveWording: string, negativeWording?: string) {
    if (value === undefined || value < 0) {
      this.risks.push(unknownWording);
    } else if (value === 1) {
      this.risks.push(positiveWording);
    } else if (negativeWording !== undefined) {
      this.risks.push(negativeWording);
    }
  }

  getRiskFactorWording(): string {
    return this.risks.join(', ');
  }

  addDeclarativeTerm(value: number, unknownWording: string, positiveWording: string) {
    this.risks.push(value === undefined || value < 0 ? unknownWording : positiveWording);
  }
}
