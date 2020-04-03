export const NUMBER_MANAGER_VIEW_PAGE = 'number-manager/view:page';
export const NUMBER_MANAGER_VIEW_KEBAB = 'number-manager/view:kebab';
export const NUMBER_MANAGER_RELEASE_ACTION = 'number-manager/action:release';

export const permissions = {
  master_admin: [
  ],
  admin: [
    NUMBER_MANAGER_VIEW_PAGE,
    NUMBER_MANAGER_VIEW_KEBAB,
    NUMBER_MANAGER_RELEASE_ACTION
  ],
  staff: [],
  junior_staff: []
};
