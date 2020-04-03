interface ILeadStage {
  id: number;
  isActive: boolean;
  isCustom: boolean;
  leadStageTitle: string;
  leadStageNumber: number;
  company: number;
}

export interface IState {
  leadStages: Array<ILeadStage>;
  isLoading: boolean;
  error: boolean;
}
