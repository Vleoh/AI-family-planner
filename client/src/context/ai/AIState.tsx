import React, { useReducer } from 'react';
import axios from 'axios';
import AIContext from './aiContext';
import aiReducer from './aiReducer';
import {
  RESOLVE_DISPUTE,
  SUGGEST_ACTIVITY,
  AI_ERROR
} from '../types';

const AIState = (props: any) => {
  const initialState = {
    resolution: null,
    suggestion: null,
    error: null
  };

  const [state, dispatch] = useReducer(aiReducer, initialState);

  // Resolve Dispute
  const resolveDispute = async (dispute: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/ai/resolve-dispute', { dispute }, config);

      dispatch({
        type: RESOLVE_DISPUTE,
        payload: res.data
      });
    } catch (err: any) {
      dispatch({
        type: AI_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Suggest Activity
  const suggestActivity = async (interests: string, location: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/ai/suggest-activity', { interests, location }, config);

      dispatch({
        type: SUGGEST_ACTIVITY,
        payload: res.data
      });
    } catch (err: any) {
      dispatch({
        type: AI_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <AIContext.Provider
      value={{
        resolution: state.resolution,
        suggestion: state.suggestion,
        error: state.error,
        resolveDispute,
        suggestActivity
      }}
    >
      {props.children}
    </AIContext.Provider>
  );
};

export default AIState;