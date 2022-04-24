import { observer } from 'mobx-react-lite';
import Moment from 'moment';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Headline, Text, TextInput, useTheme } from 'react-native-paper';
import { Edge } from 'react-native-safe-area-context';
import CustomButton from '~/components/common/custom-button';
import Container from '~/components/container';
import CustomHeader from '~/components/custom-header';
import { COLORS, SIZES } from '~/constant/Themes';
import { DrawerScreenProp } from '~/navigators/drawer';
import { useRootStore } from '~/stores/store-setup';
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

const edges: Edge[] = ['right', 'bottom', 'left'];

const Welcome = observer<DrawerScreenProp<'Welcome'>>(({ navigation }) => {
  const theme = useTheme();
  const { addExpense } = useRootStore();
  const [foodExpense, setFoodExpense] = useState<string>('');
  const [homeRExpense, setHomeRExpense] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // expense adding function.
  const addExpenseHandler = () => {
    setIsLoading(true);
    if (foodExpense === '' && homeRExpense === '') {
      Alert.alert('Warnning !', 'All filed should not be empty', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log(date) },
      ]);
    } else {
      addExpense({
        expenseId: Math.random().toString(16).slice(2),
        date: Moment(date).format('DD-MM-YYYY'),
        foodExpense: foodExpense,
        homeRentExpense: homeRExpense,
      });
      Alert.alert('Success !', 'Cost expense added successfull', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log(date) },
      ]);
    }
    setIsLoading(false);
    setFoodExpense('');
    setHomeRExpense('');
  };

  return (
    <Container
      edges={edges}
      header={<CustomHeader onLeftMenuPress={navigation.toggleDrawer} title="Money Expense" />}
    >
      <View style={styles.container}>
        <Headline style={[styles.headline, { color: theme.colors.placeholder }]}>
          Add Expense
        </Headline>

        <Text style={[styles.expense, { color: theme.colors.placeholder }]}>Food Expence :</Text>
        <TextInput
          label="tk. "
          keyboardType="numeric"
          value={foodExpense}
          style={{ height: SIZES.width / 8 }}
          onChangeText={(text) => setFoodExpense(text)}
        />

        <Text style={[styles.expense, { color: theme.colors.placeholder }]}>
          Home Rent Expence :
        </Text>
        <TextInput
          label="tk. "
          keyboardType="numeric"
          value={homeRExpense}
          style={{ height: SIZES.width / 8 }}
          onChangeText={(text) => setHomeRExpense(text)}
        />

        <View style={styles.calenderContain}>
          <Text style={[styles.expense, { color: theme.colors.placeholder }]}>
            Select rent date :
          </Text>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
          >
            <Animatable.Text
              animation="slideInDown"
              iterationCount={2}
              direction="alternate-reverse"
              style={styles.calendarStyle}
            >
              Open Calender
            </Animatable.Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.addExpenseBtn}>
          <CustomButton
            isLoading={isLoading}
            bgColor={COLORS.blue}
            style={{ width: SIZES.width / 2.2 }}
            iconFirst={'plus'}
            btnTxt="Add expense"
            onPress={() => {
              addExpenseHandler();
            }}
          />
        </View>
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  calenderContain: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
    marginVertical: 15,
  },
  expense: {
    marginVertical: 20,
  },
  addExpenseBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
  calendarStyle: { fontSize: 18, color: COLORS.blue, marginLeft: 10 },
});

export default Welcome;
