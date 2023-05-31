import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from '../Profile/Sections/infoScetion/SimpleSection';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import Clipboard from '@react-native-clipboard/clipboard';
import {Tip} from 'react-native-tip';
import {TextInputPlainText} from '../../Pages/signedIn/menupages/establishment/createEstablishment';
import SubmitButton from '../touchables/SubmitButton';
import {useAppDispatch} from '../../redux/hooks';
import {EditEstablishmentTexPercentage} from '../../redux/Order/MyEstablishment/taxes/editEsablishmentTaxes.thunk';
const EditIcon = require('../../assets/utilityIcons/edit.png');

const TaxPercentage = ({
  taxPercentage,
  establishmentId,
}: {
  taxPercentage?: number;
  establishmentId: string;
}) => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [taxPercentageString, setTaxPercentageString] = useState(
    taxPercentage ? taxPercentage.toString() : '',
  );
  const regex = /^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/;
  const dispatch = useAppDispatch();

  const replaceDots = async (str: string) => {
    const newstr = str.replace(',', '.').replace('%', '');
    return newstr;
  };
  return (
    <View style={{position: 'relative'}}>
      <SimpleSection
        title={'Establishment Tax Percentage'}
        isEditModeEnabled={isEditModeEnabled}
        ExtraButton={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
                //
              }}
              style={{
                borderRadius: 40,
              }}>
              <Image
                source={EditIcon}
                style={{width: 18, height: 18, margin: 3}}
              />
            </TouchableOpacity>
          );
        }}>
        {!isEditModeEnabled ? (
          <Text style={[Textstyles.text, {marginLeft: 10}]}>
            {' '}
            {taxPercentage?.toString()}
            {'% '}
          </Text>
        ) : (
          <>
            <TextInputPlainText
              value={taxPercentageString}
              onChange={text => {
                setTaxPercentageString(text);
              }}
              placeholder="please enter a percentage"
            />
            <SubmitButton
              title="Submit"
              onPress={async () => {
                setTaxPercentageString(taxPercentageString.replace(',', '.'));
                const newText = await replaceDots(taxPercentageString);
                if (!regex.test(newText)) {
                  Alert.alert(
                    'Validation Failed',
                    `percentage must be a number between 0 and 100 ${newText}`,
                  );
                } else {
                  dispatch(
                    EditEstablishmentTexPercentage({
                      estId: establishmentId,
                      tax: parseFloat(taxPercentageString),
                    }),
                  );
                  setTaxPercentageString('');
                  setIsEditModeEnabled(false);
                  // TODO: dispatch action to update tax percentage
                }
              }}
            />
          </>
        )}
      </SimpleSection>
    </View>
  );
};

export default TaxPercentage;

const styles = StyleSheet.create({});
