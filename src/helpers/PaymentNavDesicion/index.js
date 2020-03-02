/* eslint-disable camelcase */
import {
  CURRENT_PAYMENT_STAGE_CHANGE,
  PAYMENT_TRANSACTIONS,
  STAGES_ID,
  SUBMIT_PAYMENT_BOARDING,
  GET_TRANSACTIONS,
  RETURN_TO_CAMP,
  INTERVIEW_STATUS,
  PAYMENT_STATUS_ROUTE,
} from '../../constants';

const isPaid = (stage, transactions, { stage0, stage1, stage2, stage3, stage4 }) => {
  const resp = {
    STAGE_ONE: false,
    STAGE_TWO: false,
    STAGE_THREE: false,
  };
  const progressStage = {
    STAGE_ONE: stage0,
    STAGE_TWO: stage1,
    STAGE_THREE: stage2,
    STAGE_FOUR: stage3,
  };
  console.log('stg', progressStage);
  if (transactions.length > 0 && transactions[0].stage_id !== null) {
    transactions.forEach((val, i) => {
      stage.forEach(st => {
        if (st && val.stage_id === STAGES_ID[st[0]] && progressStage[st[0]] === 100) {
          resp[st[0]] = true;
        }
      });
    });
    return resp;
  }
  return resp;
};

const isPaymentEnable = (
  { stage0, stage1, stage2, stage3, stage4 },
  name,
  transactions,
  interviewStatus,
  application_type
) => {
  const resp = {
    STAGE_ONE: false,
    STAGE_TWO: false,
    STAGE_THREE: false,
  };
  switch (name) {
    case 'Stage 1':
      if (stage0 === 100 && stage1 < 100 && !transactions.find(val => val.stage_id === 1)) {
        resp.STAGE_ONE = true;
      }
      break;
    case 'Stage 2':
      if (application_type === RETURN_TO_CAMP) {
        if (stage2 === 100 && stage3 < 100 && !transactions.find(val => val.stage_id === 3)) {
          resp.STAGE_TWO = true;
        }
      } else if (application_type !== RETURN_TO_CAMP) {
        if (
          stage1 === 100 &&
          stage2 < 100 &&
          !transactions.find(val => val.stage_id === 2) &&
          interviewStatus === INTERVIEW_STATUS.confirmed
        ) {
          resp.STAGE_TWO = true;
        }
      }
      break;
    case 'Stage 3':
      if (stage2 === 100 && stage3 < 100 && !transactions.find(val => val.stage_id === 3)) {
        resp.STAGE_THREE = true;
      }
      break;
    case 'Stage 4':
      break;
    default:
      return resp;
  }
  return resp;
};

const setRoute = (
  application_type,
  Transactions,
  renderArray,
  inputChanged,
  setState,
  stageProgress,
  status
) => {
  const paid = { stageId: null };
  const sortedTransactions = Transactions.sort((a, b) => a.stage_id - b.stage_id);
  sortedTransactions.forEach((val, i) => {
    if (renderArray[i] && val.stage_id) {
      paid.stageId = val.stage_id;
    }
  });
  const lim = application_type === RETURN_TO_CAMP ? 3 : 3;
  console.log('lim/paid', lim, paid);
  if (paid.stageId && lim === paid.stageId) {
    setState({ nextNav: PAYMENT_TRANSACTIONS });
  } else if (paid.stageId && lim > paid.stageId) {
    if (application_type === RETURN_TO_CAMP) {
      if (
        stageProgress.stage2 === 100 &&
        stageProgress.stage3 < 100 &&
        !Transactions.find(val => val.stage_id === 3)
      ) {
        setState({ navData: renderArray[paid.stageId][0] });
        inputChanged(
          {
            currentPaymentStage: renderArray[paid.stageId][0],
            currentPaymentStageTitle: renderArray[paid.stageId][1].title,
          },
          CURRENT_PAYMENT_STAGE_CHANGE
        );
      } else {
        setState({ nextNav: '' });
      }
    } else if (application_type !== RETURN_TO_CAMP) {
      if (status === INTERVIEW_STATUS.confirmed) {
        setState({ navData: renderArray[paid.stageId][0] });
        inputChanged(
          {
            currentPaymentStage: renderArray[paid.stageId][0],
            currentPaymentStageTitle: renderArray[paid.stageId][1].title,
          },
          CURRENT_PAYMENT_STAGE_CHANGE
        );
      } else {
        setState({ nextNav: '' });
      }
    }
  } else if (paid.stageId == null) {
    setState({ navData: renderArray[0][0] });
    inputChanged(
      {
        currentPaymentStage: renderArray[0][0],
        currentPaymentStageTitle: renderArray[0][1].title,
      },
      CURRENT_PAYMENT_STAGE_CHANGE
    );
  }
};

const selectPaymentNav = (Transaction, prevTr, navigate, inputChanged, name, title, callBack) => {
  if (Transaction && Transaction.stage_id) {
    return navigate(PAYMENT_STATUS_ROUTE); // inputChanged({ isNavigate: true, backToDashboard: true }, GET_TRANSACTIONS);
  }
  if (prevTr && prevTr.stage_id) {
    callBack(
      { currentPaymentStage: name, currentPaymentStageTitle: title },
      CURRENT_PAYMENT_STAGE_CHANGE
    );
    return navigate(SUBMIT_PAYMENT_BOARDING, { dataNav: name });
  }
  if (name === 'STAGE_ONE') {
    callBack(
      { currentPaymentStage: name, currentPaymentStageTitle: title },
      CURRENT_PAYMENT_STAGE_CHANGE
    );
    return navigate(SUBMIT_PAYMENT_BOARDING, { dataNav: name });
  }
};

export { isPaid, setRoute, selectPaymentNav, isPaymentEnable };
