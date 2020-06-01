import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DETAILPATIENT_LIST";
      payload: Patient;
    }
  | {
      type: "EDIT_DETAILPATIENT_LIST";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

// TO fetch new list of patients
export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: `SET_PATIENT_LIST`, payload: patientListFromApi };
};

export const addPatient = (patient: Patient): Action => {
  return { type: `ADD_PATIENT`, payload: patient };
};

export const setDetailPatient = (patient: Patient): Action => {
  return { type: `SET_DETAILPATIENT_LIST`, payload: patient };
};

export const setDiagnosis = (diagnosisList: Diagnosis[]): Action => {
  return { type: `SET_DIAGNOSIS_LIST`, payload: diagnosisList };
};

export const addEntry = (patient: Patient): Action => {
  return { type: "EDIT_DETAILPATIENT_LIST", payload: patient };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case "SET_DETAILPATIENT_LIST":
      return {
        ...state,
        detailPatients: {
          ...state.detailPatients,
          [action.payload.id]: action.payload,
        },
      };
    case "EDIT_DETAILPATIENT_LIST":
      return {
        ...state,
        detailPatients: {
          ...state.detailPatients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
