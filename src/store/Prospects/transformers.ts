export const mergeLeadStageTitle = (data: any, leadStages: Array<any>) => {
  const prospects: Array<any> = data.results;

  const results: Array<any> = prospects.map(prospect => {
    let leadStageFound = leadStages.find(leadStage => leadStage.id === prospect.leadStage) || {};
    return { ...prospect, leadStageTitle: leadStageFound.leadStageTitle };
  });

  return { ...data, results };
};
