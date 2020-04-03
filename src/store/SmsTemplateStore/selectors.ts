import { ITemplate } from './actions';

interface ISmsTemplates {
  smsTemplates: {
    templates: ITemplate[];
    quickReplies: any[];
  };
}

export const smsTemplates = ({ smsTemplates }: ISmsTemplates) => smsTemplates.templates || [];

export const getQuickReplies = ({ smsTemplates }: ISmsTemplates) => smsTemplates.quickReplies || [];
