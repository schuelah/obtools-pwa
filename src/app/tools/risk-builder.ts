export class RiskBuilder {
  risks: Array<string> = [];

  constructor() {
  }

  public addSimpleTerm(value: number, unknownWording: string, riskWording: string) {
    if (value === undefined || value < 0) {
      this.risks.push(unknownWording);
    } else if (value === 1) {
      this.risks.push(riskWording);
    }
  }

  getRiskFactorWording(): string {
    return this.risks.join(', ');
  }

  addDeclarativeTerm(value: number, unknownWording: string, riskWording: string) {
    this.risks.push(value === undefined || value < 0 ? unknownWording : riskWording);
  }
}
