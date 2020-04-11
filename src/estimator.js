const covid19ImpactEstimator = (data) => {
    // Challenge-1
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
    return {
      data: {},
      impact: {
        currentlyInfected: data.reportedCases * 10,
        infectionsByRequestedTime: (data.reportedCases * 10) * (2 ** (estimator()))
      },
      severeImpact: {
        currentlyInfected: data.reportedCases * 50,
        infectionsByRequestedTime: (data.reportedCases * 50) * (2 ** (estimator()))
      }
    };
  };
  export default covid19ImpactEstimator;
  