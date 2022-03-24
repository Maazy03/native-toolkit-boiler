import React, {useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import MultiSelect from 'react-native-multiple-select';

const CustomDropDownMultiSelect = props => {
  const {min, max, item, setItem, array, title} = props;
  return (
    <View style={[styles.container]}>
      {/* <CustomText style={[styles.text]}>{title}</CustomText> */}
      <MultiSelect
        items={props.newArray}
        onSelectedItemsChange={selectedItems => {
          setItem(selectedItems);
        }}
        selectedItems={props.selectedItems}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Items..."
        textInputProps={{autoFocus: false}}
        hideDropdown
        tagRemoveIconColor="#CCC"
        tagBorderColor={Color.green}
        tagTextColor={Color.green}
        displayKey="name"
        uniqueKey="id"
        // hideSubmitButton
        submitButtonColor={Color.green}
        submitButtonText={'Done'}
        styleMainWrapper={{
          width: Dimensions.get('window').width * 0.9,
          flexWrap: 'wrap',
          flexDirection: 'row',
          borderRadius: 10,
        }}
        styleInputGroup={{
          borderColor: Color.lightGrey,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          paddingRight: 10,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        }}
        selectedItemIconColor={Color.green}
        selectedItemTextColor={Color.green}
        styleDropdownMenu={{
          width: Dimensions.get('window').width * 0.8,
          paddingHorizontal: 10,
          borderColor: Color.lightGrey,
          borderWidth: 1,
          height: 50,
          borderRadius: 10,
        }}
        styleItemsContainer={{
          backgroundColor: Color.white,
          width: Dimensions.get('window').width * 0.8,
          borderColor: Color.lightGrey,
          borderWidth: 1,
          maxHeight: Dimensions.get('window').height * 0.2,
          //   borderBottomEndRadius: 10,
          //   borderBottomStartRadius: 10,
        }}
        styleTextDropdownSelected={{fontSize: 16, color: Color.gray}}
        styleTextDropdown={{
          fontSize: 16,
          color: Color.gray,
          paddingLeft: Dimensions.get('window').width * 0.0325,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.01,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Color.black,
    marginBottom: Dimensions.get('window').height * 0.01,
    textTransform: 'capitalize',
  },

  dropDownBtn: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.lightGrey,
    height: Dimensions.get('window').height * 0.08,
  },
  dropDownBtnText: {
    width: Dimensions.get('window').width * 0.9,
    fontSize: 16,
    color: Color.gray,
    textAlign: 'center',
    // fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  dropDownRow: {
    backgroundColor: Color.white,
  },
  dropDownRowText: {
    width: Dimensions.get('window').width * 0.75,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomDropDownMultiSelect;
