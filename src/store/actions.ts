import { createAction } from '@reduxjs/toolkit';

export const resetCheckAuthToast = createAction('app/resetCheckAuthToast');
export const resetPutUserProfileErrMsg = createAction('app/resetPutUserProfileErrMsg');
export const resetWithdrawStatus = createAction('app/resetWithdrawStatus');
