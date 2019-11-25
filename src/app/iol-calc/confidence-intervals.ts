export interface ConfidenceIntervals {
  group: string;
  csrate: number;
  lower: number;
  upper: number;
}

export const CI_TABLE: ConfidenceIntervals[] = [
  {group: '	0-10%	', csrate: 5.13, lower: 5.1, upper: 5.16},
  {group: '	10-20%	', csrate: 14.86, lower: 14.77, upper: 14.95},
  {group: '	20-30%	', csrate: 24.97, lower: 24.86, upper: 25.07},
  {group: '	30-40%	', csrate: 34.62, lower: 34.49, upper: 34.75},
  {group: '	40-50%	', csrate: 44.41, lower: 44.23, upper: 44.6},
  {group: '	50-60%	', csrate: 54.25, lower: 53.98, upper: 54.52},
  {group: '	60-70%	', csrate: 64.13, lower: 63.71, upper: 64.56},
  {group: '	70-80%	', csrate: 74.08, lower: 73.4, upper: 74.76},
  {group: '	80-90%	', csrate: 84.67, lower: 83.85, upper: 85.49},
  {group: '	90-100%	', csrate: 93.03, lower: 92.17, upper: 93.89},
];
