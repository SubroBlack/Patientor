import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, NewEntryProps } from "../types";
import {
  useStateValue,
  setDetailPatient,
  setDiagnosis,
  addEntry,
} from "../state";
import { Container, Button } from "semantic-ui-react";
import Entry from "../components/Entry";
import AddEntryModal from "../AddEntryModal";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, dispatch] = useStateValue();
  // Fetching Diagnosis List
  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosis(diagnosisList));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosisList();
  }, [dispatch]);

  const state = useStateValue()[0];
  // Fetching Patient Details
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: detailPatientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setDetailPatient(detailPatientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!state.detailPatients[id]) {
      console.log("API called");
      fetchPatient();
    }
  }, [dispatch, id, state.detailPatients]);
  const patient = state.detailPatients[id];

  // Add Entry Modal Funcs
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // Adding New Entry
  const submitNewEntry = async (values: NewEntryProps) => {
    try {
      console.log("PatientPage Value: ", values);
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  console.log(state);
  if (!patient) {
    return null;
  }

  return (
    <Container>
      <h3>{patient.name}</h3>
      <div>
        <p>Born: {patient.dateOfBirth}</p>
        <p>{patient.gender}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
      </div>
      <br />
      <h3>Entries</h3>

      {patient.entries
        ? patient.entries.map((entry) => <Entry key={entry.id} entry={entry} />)
        : null}
      <hr />
      <div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    </Container>
  );
};

export default PatientPage;
