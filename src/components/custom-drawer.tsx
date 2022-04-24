import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Drawer, Text } from 'react-native-paper';
import FixedContainer from '~/components/fixed-container';

const iconProps = {
  color: '',
  size: 0,
  focused: false,
};

const CustomDrawer = observer<DrawerContentComponentProps>((props) => {
  return (
    <FixedContainer style={styles.drawer} edges={['top', 'bottom', 'left']}>
      <Drawer.Section style={styles.container}>
        <Avatar.Image
          style={styles.avatar}
          size={48}
          source={require('~/assets/bootsplash_logo2.png')}
        />
        <View style={styles.contents}>
          <Text style={styles.title}>Money Expense</Text>
          <Text style={styles.title2}>Apps for BS 23</Text>
        </View>
      </Drawer.Section>
      <Drawer.Section>
        {props.state.routes.map((route, i) => (
          <Drawer.Item
            key={route.key}
            active={props.state.index === i}
            label={props.descriptors[route.key].options.title || route.name}
            icon={props.descriptors[route.key].options.drawerIcon?.(iconProps) ?? undefined}
            onPress={() => props.navigation.navigate(route.name)}
          />
        ))}
      </Drawer.Section>
    </FixedContainer>
  );
});

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 20,
  },
  contents: {
    marginLeft: 10,
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  title: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title2: {
    marginLeft: 15,
    fontSize: 11,
  },
  footer: {
    marginTop: 'auto',
  },
  toggle: {
    alignItems: 'center',
    marginLeft: 9,
  },
  togglebtn: {
    borderWidth: 0,
  },
  theme: {
    marginLeft: 9,
  },
});

export default CustomDrawer;
