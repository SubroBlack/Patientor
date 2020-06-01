import patientData from "../../data/patients";
import { v4 as uuid } from "uuid";
import { Patient, PatientCensored, NewPatient, Entry } from "../types";

const getPatients = (): Patient[] => {
  return patientData;
};

const getPatientsCensored = (): PatientCensored[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatient);
  console.log("new Patient: ", newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient => {
  try {
    const reqPatients = patientData.filter((p) => p.id === id);
    return reqPatients[0];
  } catch (error) {
    throw new Error(`Cannot Find the Patient`);
  }
};

const addEntry = (entry: Entry, id: string): Patient => {
  try {
    const patient = patientData.filter((p) => p.id === id)[0];
    patient.entries = patient.entries.concat(entry);
    patientData.filter((p) => p.id !== id).concat(patient);
    return patient;
  } catch (error) {
    throw new Error(`Cannot add entry on the Patient`);
  }
};

export default {
  getPatients,
  getPatientsCensored,
  addPatient,
  getPatient,
  addEntry,
};
