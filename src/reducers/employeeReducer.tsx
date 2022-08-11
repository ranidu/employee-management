import { EmployeeActionTypes } from "../actions/types";
import { EmployeeInterface } from "../actions/employeeAction";

const initState: {
  employees: EmployeeInterface[];
  employee: EmployeeInterface | {};
  error: boolean;
  loading: boolean;
  success: boolean;
  createdSuccess: boolean;
  updatedSuccess: boolean;
  deleteSuccess: boolean;
} = {
  employees: [],
  employee: {},
  error: false,
  loading: false,
  success: false,
  createdSuccess: false,
  updatedSuccess: false,
  deleteSuccess: false,
};

const employeeReducer = (state = initState, action: any) => {
  switch (action.type) {
    case EmployeeActionTypes.RETRIEVE_STARTED:
      return { ...state, loading: true, employee: {}, createdSuccess: false, updatedSuccess: false, deleteSuccess: false };
    case EmployeeActionTypes.RETRIEVE_COMPLETED:
      return {
        ...state,
        loading: false,
        employees: action.employees,
        success: true,
      };
    case EmployeeActionTypes.RETRIEVE_FAILED:
      return { ...state, loading: false, error: true, createdSuccess: false };
    case EmployeeActionTypes.GET_EMPLOYEE_STARTED:
      return { ...state, loading: true, employee: {}, createdSuccess: false, updatedSuccess: false, deleteSuccess: false };
    case EmployeeActionTypes.GET_EMPLOYEE_COMPLETED:
      return {
        ...state,
        loading: false,
        employee: action.employee,
        success: true,
      };
    case EmployeeActionTypes.GET_EMPLOYEE_FAILED:
      return { ...state, loading: false, employee: null, error: true };
    case EmployeeActionTypes.CREATE_EMPLOYEE_STARTED:
      return { ...state, loading: true, employee: {}, createdSuccess: false, updatedSuccess: false, deleteSuccess: false };
    case EmployeeActionTypes.CREATE_EMPLOYEE_COMPLETED:
      return {
        ...state,
        loading: false,
        employee: action.employee,
        createdSuccess: true,
      };
    case EmployeeActionTypes.CREATE_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        employee: null,
        createdSuccess: false,
      };
    case EmployeeActionTypes.UPDATE_EMPLOYEE_STARTED:
      return { ...state, loading: true, createdSuccess: false, updatedSuccess: false, deleteSuccess: false };
    case EmployeeActionTypes.UPDATE_EMPLOYEE_COMPLETED:
      return {
        ...state,
        loading: false,
        employee: action.employee.data,
        success: true,
        updatedSuccess: true
      };
    case EmployeeActionTypes.UPDATE_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        employee: null,
        error: true,
        createdSuccess: false,
        updatedSuccess: false
      };
    case EmployeeActionTypes.DELETE_EMPLOYEE_STARTED:
      return { ...state, loading: true, createdSuccess: false, updatedSuccess: false, deleteSuccess: false };
    case EmployeeActionTypes.DELETE_EMPLOYEE_COMPLETED:
      return {
        ...state,
        loading: false,
        employee: action.employee,
        success: true,
        deleteSuccess: true
      };
    case EmployeeActionTypes.DELETE_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        employee: null,
        error: true,
        createdSuccess: false,
        deleteSuccess: false
      };
    default:
      return state;
  }
};

export default employeeReducer;
