import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Switch} from 'react-native';
import PosdataButton from '../../components/PosdataButton';
import {useSettings} from '../../context/settings';
import {useAuth} from '../../context/auth';

const Configuration = ({navigation}: any) => {
  const {setDarkTheme, setLightTheme, theme} = useSettings();
  const {logout} = useAuth();

  const handleChamgeTheme = () => {
    theme.dark ? setLightTheme() : setDarkTheme();
  };

  interface RowProps {
    label?: string;
    isActive?: boolean;
    onPress?: () => void;
  }

  const ConfigRow = ({label, isActive, onPress}: RowProps) => {
    return (
      <View
        style={[styles.rowContainer, {borderBottomColor: theme.colors.text}]}>
        <Text style={[styles.rowLabelText, {color: theme?.colors.text}]}>
          {label}
        </Text>
        <Switch value={isActive} onValueChange={onPress} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={[styles.titleText, {color: theme?.colors?.text}]}>
          CONFIGURATION
        </Text>
        <ConfigRow
          label="Darck mode"
          isActive={theme.dark}
          onPress={handleChamgeTheme}
        />
        <PosdataButton title="LOG OUT" onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    width: '100%',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 35,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  rowLabelText: {
    fontWeight: '400',
    fontSize: 16,
  },
});

export default Configuration;
