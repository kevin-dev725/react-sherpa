export const mergeLeadStageTitle = (prospects: any, leadStages: Array<any>) => {
  const results: Array<any> = prospects.map((prospect: any) => {
    let leadStageFound = leadStages.find(leadStage => leadStage.id === prospect.leadStage) || {};
    return { ...prospect, leadStageTitle: leadStageFound.leadStageTitle };
  });

  return results;
};
