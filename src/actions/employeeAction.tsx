import { v4 as uuidv4 } from "uuid";
import { EmployeeActionTypes } from "./types";

export interface EmployeeInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
}

export const getEmployees = () => {
  return (dispatch: any) => {
    dispatch({ type: EmployeeActionTypes.RETRIEVE_STARTED });

    try {
      const employees: EmployeeInterface[] = getAllEmployees();
      dispatch({ type: EmployeeActionTypes.RETRIEVE_COMPLETED, employees });
    } catch (e) {
      dispatch({ type: EmployeeActionTypes.RETRIEVE_FAILED });
    }
  };
};

export const getEmployeeById = (id: string) => {
  return (dispatch: any) => {
    dispatch({ type: EmployeeActionTypes.GET_EMPLOYEE_STARTED });

    try {
      const employees: EmployeeInterface[] = getAllEmployees();
      const employee = employees.find((value) => value.id === id);
      dispatch({ type: EmployeeActionTypes.GET_EMPLOYEE_COMPLETED, employee });
    } catch (e) {
      dispatch({ type: EmployeeActionTypes.GET_EMPLOYEE_FAILED });
    }
  };
};

export const createEmployee = (payload: EmployeeInterface) => {
  return (dispatch: any) => {
    if (payload) {
      dispatch({ type: EmployeeActionTypes.CREATE_EMPLOYEE_STARTED });

      try {
        const employees = getAllEmployees();

        employees.push({ ...payload, id: uuidv4() });

        saveRecord(employees);

        dispatch({
          type: EmployeeActionTypes.CREATE_EMPLOYEE_COMPLETED,
          action: { employee: payload },
        });
      } catch (e) {
        dispatch({ type: EmployeeActionTypes.CREATE_EMPLOYEE_FAILED });
      }
    } else {
      dispatch({ type: EmployeeActionTypes.CREATE_EMPLOYEE_FAILED });
    }
  };
};

export const updateEmployee = (id: string | undefined , payload: EmployeeInterface) => {
  return (dispatch: any) => {
    dispatch({ type: EmployeeActionTypes.UPDATE_EMPLOYEE_STARTED });

    try {
      const employees: EmployeeInterface[] = getAllEmployees();
      const employee: any = employees.find((value) => value.id === id);
      let index = employees.indexOf(employee);
      employees[index] = {...payload, id};

      deleteRecords();

      saveRecord(employees);

      dispatch({ type: EmployeeActionTypes.UPDATE_EMPLOYEE_COMPLETED, employee });
    } catch (e) {
      dispatch({ type: EmployeeActionTypes.UPDATE_EMPLOYEE_FAILED });
    }
  }
};

export const deleteEmployee = (id: string) => {
  return (dispatch: any) => {
    dispatch({ type: EmployeeActionTypes.DELETE_EMPLOYEE_STARTED });

    try {
      const employees: EmployeeInterface[] = getAllEmployees();
      const employee: any = employees.filter((value) => value.id !== id);

      deleteRecords();

      saveRecord(employee);

      dispatch({ type: EmployeeActionTypes.DELETE_EMPLOYEE_COMPLETED, employee });
    } catch (e) {
      dispatch({ type: EmployeeActionTypes.DELETE_EMPLOYEE_FAILED });
    }
  }
};

const getAllEmployees = () => {
  const existsEmp: string | null = localStorage.getItem("employee_rem");
  return existsEmp ? JSON.parse(existsEmp) : [];
};

const saveRecord = (payload: EmployeeInterface[]) => {
  if (payload) {
    localStorage.setItem("employee_rem", JSON.stringify(payload));
  }
};

const deleteRecords = () => {
  localStorage.removeItem("employee_rem");
}
