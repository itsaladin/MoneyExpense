import { flow, types } from 'mobx-state-tree';
import { AddExpenseStore, AddExpenseStoreType } from '~/stores/add-expense';

/**
 * Example of a Appwide Global Store
 */

const RootStore = types
  .model('RootStore', {
    userColorScheme: types.maybeNull(types.union(types.literal('light'), types.literal('dark'))),
    hydrated: false,
    addExpenseStore: types.map(AddExpenseStore),
  })
  .actions((self) => ({
    setUserColorScheme(colorScheme: typeof self.userColorScheme | 'auto') {
      if (colorScheme === 'auto') {
        self.userColorScheme = null;
      } else {
        self.userColorScheme = colorScheme;
      }
    },
    hydrate: flow(function* hydrate() {
      try {
        self.hydrated = true;
      } catch (error) {
        console.error(error);
        self.hydrated = true;
      }
    }),
    addExpense(item: AddExpenseStoreType) {
      if (self.addExpenseStore.has(item.expenseId)) {
        return console.log('Expense is already in the list', item.expenseId);
      }
      self.addExpenseStore.put(item);
    },
  }))
  .views((self) => ({
    get currentColorScheme() {
      if (self.userColorScheme) {
        return self.userColorScheme;
      }
      return 'auto';
    },
    get cartExpense() {
      return [...self.addExpenseStore.values()];
    },
  }));

export default RootStore;
