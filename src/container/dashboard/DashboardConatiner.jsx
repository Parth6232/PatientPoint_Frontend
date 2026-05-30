import DashboardComponent from '@components/dashboard/DashboardComponent';
import { WelcomPatient } from '@components/dashboard/Welcom-patient';
import { WelcomeBanner } from '@components/dashboard/welcome-banner';
import { localStore } from 'store/localStore';

export default function DashboardConatiner() {
  const role = localStore.getRole();

  return (
    <>
      {role === 'Doctor' && <WelcomPatient role={role} />}
      {role === 'Patient' && <WelcomPatient role={role} />}
      

      {role === 'Admin' && (
        <>
          <WelcomeBanner />
          <DashboardComponent />
        </>
      )}
    </>
  );
}
