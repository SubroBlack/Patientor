import React from "react";
import { useStateValue } from "../state";
import { EntryProps, Diagnosis, HealthCheckRating } from "../types";
import HealthRatingBar from "./HealthRatingBar";

const Entry: React.FC<EntryProps> = (props) => {
  const diagnosis = useStateValue()[0].diagnosis;
  const entry = props.entry;

  const showDiagnosis = (code: Diagnosis["code"]) => {
    const diag = diagnosis[code];
    return (
      <div>
        Diagnosis: {code}: {diag.latin ? diag.latin : null} <br />
        {diag.name}
      </div>
    );
  };

  const showBasic = () => {
    return (
      <div>
        {entry.date}
        <br />
        {entry.description}
        <br />
        Specialist: {entry.specialist}
        <br />
        <div>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((d: Diagnosis["code"]) => (
                <div key={d}>{showDiagnosis(d)}</div>
              ))
            : null}
        </div>
      </div>
    );
  };

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          {showBasic()}
          Discharge Date: {entry.discharge.date} <br />
          Criteria for Discharge: {entry.discharge.criteria}
          <hr />
        </div>
      );
    case "HealthCheck":
      const rate = Number.isInteger(entry.healthCheckRating)
        ? entry.healthCheckRating
        : parseInt(HealthCheckRating[entry.healthCheckRating]);
      return (
        <div>
          {showBasic()}
          <HealthRatingBar rating={rate} showText={true} />
          <hr />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          {showBasic()}
          Employer: {entry.employerName} <br />
          {entry.sickLeave ? (
            <div>
              Sick Leave Start: {entry.sickLeave.startDate} <br />
              Sick Leave End: {entry.sickLeave.endDate}{" "}
            </div>
          ) : null}
          <hr />
        </div>
      );
    default:
      console.log(entry);
      return assertNever(entry);
  }
};

export default Entry;
