import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const AddExpenseStore = types.model('AddExpenseStore', {
  expenseId: types.identifier,
  date: types.string,
  foodExpense: types.maybeNull(types.string),
  homeRentExpense: types.maybeNull(types.string),
});

export type AddExpenseStoreType = Instance<typeof AddExpenseStore>;
export type AddExpenseSnapshotType = SnapshotOut<typeof AddExpenseStore>;
