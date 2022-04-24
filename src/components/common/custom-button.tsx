import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '~/constant/Themes';

const CustomButton = (props: any) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={props?.disabled}
        //@ts-ignore
        block
        style={[
          styles.btnStyle,
          { backgroundColor: props?.bgColor || COLORS.blue },
          props?.style || {},
        ]}
        onPress={() => props?.onPress && props?.onPress()}
      >
        <View style={styles.btnContentWrapperView}>
          {/* Icon Before Text */}
          {props?.iconFirst && (
            <IconMaterial
              name={props?.iconFirst}
              size={24}
              color={COLORS.white}
              style={[styles.iconMaterialStyle]}
            />
          )}

          {/* Button Text */}
          <Text style={props?.textStyle ? props?.textStyle : styles.btnText}>{props.btnTxt}</Text>

          {/* Loading */}
          {props?.isLoading && (
            <ActivityIndicator size={22} color={COLORS.white} style={styles.loadingStyle} />
          )}

          {/* Icon After Text */}
          {props?.icon && (
            <Icon name={props?.icon} size={17} color={COLORS.white} style={styles.iconStyle} />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },

  // Last Added Css
  btnContentWrapperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  iconStyle: { marginLeft: 10 }, // Icon After Text
  iconMaterialStyle: {
    marginRight: 10,
  }, // Icon Before Text
  loadingStyle: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
});
