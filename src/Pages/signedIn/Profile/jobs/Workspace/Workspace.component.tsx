import {useRoute} from '@react-navigation/native';
import React from 'react';

import {View} from 'react-native';
import LoggedInBackground from '../../../../../components/background/loggedInBackground';
import {WorkspaceProps} from '../../../../../navigation/Profile/ProfileNavigator.types';
import ChefInitialPage from '../JobsContainers/ChefSection/ChefInitialPage';
import WaiterInitialPage from '../JobsContainers/WaiterSection/WaiterInitialPage';

const Workspace = () => {
  const {params} = useRoute<WorkspaceProps['route']>();
  const {jobId, screen} = params;
  const ReturnScreenOption = () => {
    switch (screen) {
      case 'chef':
        return <ChefInitialPage jobId={jobId} />;
      case 'driver':
        return <View></View>;
      case 'waiter':
        return <WaiterInitialPage jobId={jobId} />;

      default:
        return <View></View>;
    }
  };
  return (
    <LoggedInBackground>
      <ReturnScreenOption />
    </LoggedInBackground>
  );
};

export default Workspace;
