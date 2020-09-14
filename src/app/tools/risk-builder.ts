export class RiskBuilder {
  risks: Array<string> = [];

  constructor() {
  }

  addSimpleTerm(value: number, unknownWording: string, positiveWording: string, negativeWording?: string): RiskBuilder {
    if (value === undefined || value < 0) {
      this.risks.push(unknownWording);
    } else if (value === 1) {
      this.risks.push(positiveWording);
    } else if (negativeWording !== undefined) {
      this.risks.push(negativeWording);
    }
    return this;
  }

  addBooleanTerm(value: boolean, positiveWording: string, negativeWording: string): RiskBuilder {
    this.risks.push(value ? positiveWording : negativeWording);
    return this;
  }

  addDeclarativeTerm(value: number, unknownWording: string, positiveWording: string): RiskBuilder {
    this.risks.push(value === undefined || value < 0 ? unknownWording : positiveWording);
    return this;
  }

  getRiskFactorWording(): string {
    return this.risks.join(', ');
  }
}
