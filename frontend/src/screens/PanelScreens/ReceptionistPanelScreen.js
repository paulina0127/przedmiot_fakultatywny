import { DoctorsMinList } from '../../components/doctor';
import { PatientsMinList } from '../../components/patient';
import { Loader } from '../../components/general';
import { useState } from 'react';

function ReceptionistPanelScreen() {
  return (
    <section className='up-section up-section-grid'>
      <PatientsMinList />
      <DoctorsMinList />
    </section>
  );
}

export default ReceptionistPanelScreen;
