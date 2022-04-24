import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, useTheme } from 'react-native-paper';
import { Edge } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import Container from '~/components/container';
import CustomHeader from '~/components/custom-header';
import PrimaryText from '~/components/primary-text';
import { COLORS, SIZES } from '~/constant/Themes';
import { DrawerScreenProp } from '~/navigators/drawer';
import { useRootStore } from '~/stores/store-setup';

const edges: Edge[] = ['right', 'bottom', 'left'];

const Expenses = observer<DrawerScreenProp<'Welcome'>>(({ navigation }) => {
  const theme = useTheme();
  const { cartExpense } = useRootStore();

  const [isWeek, setIsWeek] = useState(false);
  const [isMonth, setIsMonth] = useState(false);
  const [isAll, setIsAll] = useState(true);

  // getting current date
  const cDate = new Date();
  let cMonth = cDate.getMonth() + 1;

  const expenseFilterCategory = ['Week ↓', 'Month ↓', 'All ↓'];

  const onFilterHandler = (selectedItem: string) => {
    if (selectedItem === 'Week') {
      setIsMonth(false);
      setIsAll(false);
      setIsWeek(true);
    } else if (selectedItem === 'Month') {
      setIsWeek(false);
      setIsAll(false);
      setIsMonth(true);
    } else {
      setIsMonth(false);
      setIsWeek(false);
      setIsAll(true);
    }
  };

  return (
    <Container
      edges={edges}
      header={<CustomHeader onLeftMenuPress={navigation.toggleDrawer} title="Money Expense" />}
    >
      <View style={styles.container}>
        <Headline style={[styles.headline, { color: theme.colors.placeholder }]}>Expenses</Headline>
        <View style={styles.filterContain}>
          <PrimaryText style={[styles.filterItem, { color: theme.colors.placeholder }]}>
            Filter By
          </PrimaryText>

          <SelectDropdown
            data={expenseFilterCategory}
            onSelect={(selectedItem) => {
              onFilterHandler(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              // text represented after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              // text represented for each item in dropdown
              return item;
            }}
            buttonStyle={{
              height: SIZES.width / 10,
            }}
            buttonTextStyle={{
              color: theme.colors.placeholder,
            }}
          />
        </View>

        {cartExpense?.map((item, index) => {
          return (
            <View key={index} style={styles.expenseContainer}>
              {/* month selected,
                showing last month of data */}
              {isMonth && item?.date.slice(3, 5) === `0${cMonth}` ? (
                <>
                  <View style={styles.itemRow}>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      Food Expenses
                    </PrimaryText>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      {item?.foodExpense}
                    </PrimaryText>
                  </View>

                  <View style={styles.itemRow}>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      Home Rent Expenses
                    </PrimaryText>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      {item?.homeRentExpense}
                    </PrimaryText>
                  </View>

                  <View style={styles.itemRow}>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      Date
                    </PrimaryText>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      {item?.date}
                    </PrimaryText>
                  </View>
                </>
              ) : //   week selected,
              //   check last month for selected week,
              //   showing last week data
              isWeek &&
                item?.date.slice(3, 5) === `0${cMonth}` &&
                item?.date.slice(0, 2) >= '01' &&
                item?.date.slice(0, 2) <= '07' ? (
                <>
                  <View style={styles.itemRow}>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      Food Expenses
                    </PrimaryText>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      {item?.foodExpense}
                    </PrimaryText>
                  </View>

                  <View style={styles.itemRow}>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      Home Rent Expenses
                    </PrimaryText>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      {item?.homeRentExpense}
                    </PrimaryText>
                  </View>

                  <View style={styles.itemRow}>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      Date
                    </PrimaryText>
                    <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                      {item?.date}
                    </PrimaryText>
                  </View>
                </>
              ) : (
                //showing all expenses
                isAll && (
                  <>
                    <View style={styles.itemRow}>
                      <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                        Food Expenses
                      </PrimaryText>
                      <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                        {item?.foodExpense}
                      </PrimaryText>
                    </View>

                    <View style={styles.itemRow}>
                      <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                        Home Rent Expenses
                      </PrimaryText>
                      <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                        {item?.homeRentExpense}
                      </PrimaryText>
                    </View>

                    <View style={styles.itemRow}>
                      <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                        Date
                      </PrimaryText>
                      <PrimaryText style={[styles.expense, { color: theme.colors.placeholder }]}>
                        {item?.date}
                      </PrimaryText>
                    </View>
                  </>
                )
              )}
            </View>
          );
        })}
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  expenseContainer: {
    flex: 1,
    borderBottomColor: COLORS.messageColor,
    borderBottomWidth: 1,
  },
  headline: {
    textAlign: 'center',
    marginVertical: 15,
  },
  expense: {
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  filterItem: {
    fontSize: 18,
    marginVertical: 20,
  },
  filterContain: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Expenses;
