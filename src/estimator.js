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
  let impact15 =  0.15 * ((data.reportedCases * 10) * (2 ** (estimator())));
  let severe15 = 0.15 * ((data.reportedCases * 50) * (2 ** (estimator())));
  let expectedBed = (data.totalHospitalBeds * 0.35);
  return {
    data: {},
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: (data.reportedCases * 10) * (2 ** (estimator())),
      severeCasesByRequestedTime: impact15,
      hospitalBedsByRequestedTime: expectedBed - impact15
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: (data.reportedCases * 50) * (2 ** (estimator())),
      severeCasesByRequestedTime: severe15,
      hospitalBedsByRequestedTime: expectedBed - severe15
    }
  };
};
export default covid19ImpactEstimator;
