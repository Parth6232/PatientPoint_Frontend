import ProfileComponent from '@components/profile/ProfileComponent';
import RouteConstants from './RoutesConstants';
import HomePage from '@pages/HomePage';
import AppointmentConatiner from 'container/appointment/AppointmentConatiner';
import DoctorContainer from 'container/doctor/DoctorContainer';
import PatientsConatiner from 'container/patients/PatientsConatiner';
import DoctorApprovalsContainer from 'container/admin/DoctorApprovalsContainer';

const Routes = [
  {
    path: RouteConstants.Dashboard.path,
    component: HomePage,
    name: RouteConstants.Dashboard.name,
    role: RouteConstants.Dashboard.role,
  },
  {
    path: RouteConstants.Patients.path,
    component: PatientsConatiner,
    name: RouteConstants.Patients.name,
    role: RouteConstants.Patients.role,
  },
  {
    path: RouteConstants.Doctor.path,
    component: DoctorContainer,
    name: RouteConstants.Doctor.name,
    role: RouteConstants.Doctor.role,
  },
  {
    path: RouteConstants.Appointment.path,
    component: AppointmentConatiner,
    name: RouteConstants.Appointment.name,
    role: RouteConstants.Appointment.role,
  },
  {
    path: RouteConstants.Profile.path,
    component: ProfileComponent,
    name: RouteConstants.Profile.name,
    role: RouteConstants.Profile.role,
  },
  {
    path: RouteConstants.DoctorApprovals.path,
    component: DoctorApprovalsContainer,
    name: RouteConstants.DoctorApprovals.name,
    role: RouteConstants.DoctorApprovals.role,
  },
];

export default Routes;
