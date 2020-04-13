const covid19ImpactEstimator = (data) => {
  const estimator = () => {
    let days;
    if (data.periodType === 'days') {
      days = Math.trunc((data.timeToElapse * 1) / 3);
    } else if (data.periodType === 'weeks') {
      days = Math.trunc((data.timeToElapse * 7) / 3);
    } else if (data.periodType === 'months') {
      days = Math.trunc((data.timeToElapse * 30) / 3);
    }
    return days;
  };
  const impactInfection = (data.reportedCases * 10) * (2 ** (estimator()));
  const severeInfection = (data.reportedCases * 50) * (2 ** (estimator()));
  const impact2 = 0.02 * ((data.reportedCases * 10) * (2 ** (estimator())));
  const severe2 = 0.02 * ((data.reportedCases * 50) * (2 ** (estimator())));
  const impact5 = 0.05 * ((data.reportedCases * 10) * (2 ** (estimator())));
  const severe5 = 0.05 * ((data.reportedCases * 50) * (2 ** (estimator())));
  const impact15 = 0.15 * ((data.reportedCases * 10) * (2 ** (estimator())));
  const severe15 = 0.15 * ((data.reportedCases * 50) * (2 ** (estimator())));
  const expectedBed = (data.totalHospitalBeds * 0.35);
  return {
    data: {},
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: impactInfection,
      severeCasesByRequestedTime: Math.trunc(impact15),
      hospitalBedsByRequestedTime: Math.trunc(expectedBed - impact15),
      casesForICUByRequestedTime: impact5,
      casesForVentilatorsByRequestedTime: impact2,
      dollarsInFlight: (impactInfection * 0.65) * 1.5 * 30
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: severeInfection,
      severeCasesByRequestedTime: Math.trunc(severe15),
      hospitalBedsByRequestedTime: Math.trunc(expectedBed - severe15),
      casesForICUByRequestedTime: severe5,
      casesForVentilatorsByRequestedTime: severe2,
      dollarsInFlight: (severeInfection * 0.65) * 1.5 * 30
    }
  };
};
export default covid19ImpactEstimator;
