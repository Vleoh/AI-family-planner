import React, { useReducer } from 'react';
import axios from 'axios';
import FamilyContext from './familyContext';
import familyReducer from './familyReducer';
import {
  GET_FAMILY,
  ADD_TASK,
  DELETE_TASK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TASK,
  FILTER_TASKS,
  CLEAR_FILTER,
  FAMILY_ERROR,
  CLEAR_FAMILY
} from '../types';

const FamilyState = (props: any) => {
  const initialState = {
    family: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(familyReducer, initialState);

  // Get Family
  const getFamily = async () => {
    try {
      const res = await axios.get('/api/family');

      dispatch({
        type: GET_FAMILY,
        payload: res.data
      });
    } catch (err: any) {
      dispatch({
        type: FAMILY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Task
  const addTask = async (task: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/family/tasks', task, config);

      dispatch({
        type: ADD_TASK,
        payload: res.data
      });
    } catch (err: any) {
      dispatch({
        type: FAMILY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/api/family/tasks/${id}`);

      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    } catch (err: any) {
      dispatch({
        type: FAMILY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Task
  const updateTask = async (task: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/family/tasks/${task._id}`,
        task,
        config
      );

      dispatch({
        type: UPDATE_TASK,
        payload: res.data
      });
    } catch (err: any) {
      dispatch({
        type: FAMILY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Task
  const setCurrent = (task: any) => {
    dispatch({ type: SET_CURRENT, payload: task });
  };

  // Clear Current Task
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Tasks
  const filterTasks = (text: string) => {
    dispatch({ type: FILTER_TASKS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Clear Family
  const clearFamily = () => {
    dispatch({ type: CLEAR_FAMILY });
  };

  return (
    <FamilyContext.Provider
      value={{
        family: state.family,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getFamily,
        addTask,
        deleteTask,
        setCurrent,
        clearCurrent,
        updateTask,
        filterTasks,
        clearFilter,
        clearFamily
      }}
    >
      {props.children}
    </FamilyContext.Provider>
  );
};

export default FamilyState;