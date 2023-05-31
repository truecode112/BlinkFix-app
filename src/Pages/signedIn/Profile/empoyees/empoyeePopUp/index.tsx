import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Textstyles} from '../../../menupages/contact';
import SimpleSpacer from './SimpleSpacer';
import InfoDisplayRow from './InfoDisplayRow';
import {IWorkspaceEmployeeList} from '../../../../../redux/Order/tables/employees/GetEmployeeList.thunk';
const backgroundImage = require('../../../../../assets/background.png');

const EmployeePopup = ({
  closePopup,
  employee,
  orderCount,
}: {
  closePopup: () => void;
  employee: IWorkspaceEmployeeList;
  orderCount: number;
}) => {
  const worker = employee.worker;
  const closeIcon = require('../../../../../assets/utilityIcons/close.png');

  return (
    <TouchableOpacity style={[styles.container]} onPress={closePopup}>
      <TouchableOpacity activeOpacity={1} style={[styles.smallContainer]}>
        <Image source={backgroundImage} style={styles.backgroundImage} />
        <Text
          style={[
            Textstyles.text,
            Textstyles.title,
            {textTransform: 'capitalize', marginVertical: 0},
          ]}>
          {worker.first_name} {worker.last_name + "'s"} info
        </Text>
        <SimpleSpacer height={30} />
        <InfoDisplayRow
          title="Name"
          value={`${worker.first_name} ${worker.last_name}`}
        />
        <SimpleSpacer height={5} />
        <InfoDisplayRow title="Phone Number" value={`${worker.phone_number}`} />
        <SimpleSpacer height={5} />
        <InfoDisplayRow title="City" value={`${worker.address[0].city}`} />
        <SimpleSpacer height={5} />
        <InfoDisplayRow
          title="Address"
          value={`${worker.address[0].street} ${worker.address[0].buildingnumber}`}
        />
        <SimpleSpacer height={5} />
        <InfoDisplayRow
          title="Birthdate"
          value={`${worker.birth_year.replace('-', '/').replace('-', '/')}`}
        />
        <SimpleSpacer height={5} />
        <InfoDisplayRow
          title="Working from"
          value={`${new Date(employee.startOfWork).toLocaleDateString()}`}
        />

        <SimpleSpacer height={5} />
        <InfoDisplayRow
          title="Number of orders done"
          value={`${orderCount.toString()}`}
        />

        <TouchableOpacity
          style={{position: 'absolute', top: 20, right: 20}}
          onPress={closePopup}>
          <Image source={closeIcon} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EmployeePopup;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#00000025',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 200,
  },
  smallContainer: {
    padding: 40,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: 500,
    resizeMode: 'cover',
  },
});
