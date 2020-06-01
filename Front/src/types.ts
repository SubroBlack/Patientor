export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export enum HealthCheck {
  Healthy = "Healthy",
  LowRisk = "LowRisk",
  HighRisk = "HighRisk",
  CriticalRisk = "CriticalRisk",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthCareEntry;

export type EntryProps = {
  entry: Entry;
};

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type HospitalEntryProps = Omit<HospitalEntry, "id">;
export type HealthCheckEntryProps = Omit<HealthCheckEntry, "id">;
export type OccupationalHealthCareEntryProps = Omit<
  OccupationalHealthCareEntry,
  "id"
>;
export type NewEntryProps =
  | HospitalEntryProps
  | HealthCheckEntryProps
  | OccupationalHealthCareEntryProps;
