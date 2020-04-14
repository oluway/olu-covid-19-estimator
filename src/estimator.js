const covid19ImpactEstimator = (data) => {
  const estimator = () => {
    let days;
    if (data.periodType === 'days') {
      days = Math.trunc((data.timeToElapse) / 3);
    } else if (data.periodType === 'weeks') {
      days = Math.trunc((data.timeToElapse * 7) / 3);
    } else if (data.periodType === 'months') {
      days = Math.trunc((data.timeToElapse * 30) / 3);
    }
    return days;
  };
  const checkDay = () => {
    let value;
    if (data.periodType === 'days') {
      value = Math.trunc((data.timeToElapse));
    } else if (data.periodType === 'weeks') {
      value = Math.trunc((data.timeToElapse * 7));
    } else if (data.periodType === 'months') {
      value = Math.trunc((data.timeToElapse * 30));
    }
    return value;
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
      currentlyInfected: 10 * data.reportedCases,
      infectionsByRequestedTime: impactInfection,
      severeCasesByRequestedTime: Math.trunc(impact15),
      hospitalBedsByRequestedTime: Math.trunc(expectedBed - impact15),
      casesForICUByRequestedTime: Math.trunc(impact5),
      casesForVentilatorsByRequestedTime: Math.trunc(impact2),
      dollarsInFlight: Math.trunc((impactInfection * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / checkDay())
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: severeInfection,
      severeCasesByRequestedTime: Math.trunc(severe15),
      hospitalBedsByRequestedTime: Math.trunc(expectedBed - severe15),
      casesForICUByRequestedTime: Math.trunc(severe5),
      casesForVentilatorsByRequestedTime: Math.trunc(severe2),
      dollarsInFlight: Math.trunc((severeInfection * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / checkDay())
    }
  };
};
export default covid19ImpactEstimator;
