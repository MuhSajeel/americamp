/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { ShowNavigationBar } from 'react-native-navigation-bar-color';

import styles from './styles';
import { DashboardCard, ScreenSpinner } from '../../components/common';
import {
  SideIcons,
  UpperContent,
  MiddleContent
} from '../../components/Dashboard';
import {
  showHeader,
  enableDrawer,
  fetchUserProfile,
  enableHeader,
  inputChanged
} from '../../redux/actions';
import {
  DASHBOARD,
  GET_TRANSACTIONS,
  GET_STAGES_LIST,
  USER_FIRST_TIMER,
  USER_NOT_FIRST_TIMER
} from '../../constants';
import { calculateStageProgress } from '../../helpers/CalculateStageProgress';
import { getItem } from '../../helpers/Localstorage';

class Dashboard extends Component {
  state = { firstTimer: false, loading: true };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.showHeader();
    this.props.enableDrawer();
    this.checkFirstTimer().then(() => {
      SplashScreen.hide();
    });
    const { navigation, fetchUserProfile, inputChanged } = this.props;
    this.willFocusSubscription = navigation.addListener(
      'willFocus',
      async () => {
        this.props.showHeader();
        this.props.enableDrawer();
        await this.checkFirstTimer();
        this.props.enableHeader();
        ShowNavigationBar();
        fetchUserProfile({ callingRoute: DASHBOARD });
        inputChanged({ isNavigate: false }, GET_TRANSACTIONS);
        inputChanged({}, GET_STAGES_LIST);
        this.setState({ loading: false });
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  async checkFirstTimer() {
    const firstTimer = await getItem('@userIsFirstTimer');
    if (JSON.parse(firstTimer)) {
      this.setState({ firstTimer: true });
      this.props.inputChanged({}, USER_FIRST_TIMER);
    } else {
      this.setState({ firstTimer: false });
      this.props.inputChanged({}, USER_NOT_FIRST_TIMER);
    }
  }

  render() {
    if (Platform.OS === 'android') StatusBar.setTranslucent(true);
    const {
      navigation,
      stageProgress,
      apply_now,
      userCurrentStageReducer,
      urlLinkReducer
    } = this.props;
    const { firstTimer } = this.state;
    const progress = calculateStageProgress(stageProgress);
    if (this.state.loading) {
      return <ScreenSpinner isVisible={true} />;
    } else {
      return (
        <View style={styles.container}>
          <DashboardCard>
            <View key='upperContent'>
              <UpperContent progress={progress} firstTimer={firstTimer} />
            </View>
            <View key='middleLeftContent'>
              <SideIcons urlLinkReducer={urlLinkReducer} />
            </View>
            <View key='middleRightContent'>
              <MiddleContent
                navigation={navigation}
                apply_now={apply_now}
                userCurrentStageReducer={userCurrentStageReducer}
                stageProgress={stageProgress}
              />
            </View>
          </DashboardCard>
        </View>
      );
    }
  }
}

const mapStateToProps = ({
  stageProgress,
  stageZeroReducer: { apply_now },
  userCurrentStageReducer,
  header: { firstTimer },
  urlLinkReducer
}) => ({
  stageProgress,
  firstTimer,
  apply_now,
  userCurrentStageReducer,
  urlLinkReducer
});

export default connect(
  mapStateToProps,
  { showHeader, enableDrawer, fetchUserProfile, enableHeader, inputChanged }
)(Dashboard);
