const RouteConstants = {};

RouteConstants.Login = {
  path: '/login',
  name: 'LOGIN',
};

RouteConstants.Signup = {
  path: '/signup',
  name: 'SIGNUP',
};

RouteConstants.Register = {
  path: '/register',
  name: 'REGISTER',
};

RouteConstants.Dashboard = {
  path: '/',
  name: 'DASHBOARD',
  role: ['Admin','Patient','Doctor']
};
RouteConstants.Profile = {
  path: '/profile',
  name: 'PROFILE',
  role: ['Admin','Patient','Doctor'],
};
RouteConstants.Patients = {
  path: '/patients',
  name: 'PATIENTS',
  role: ['Admin',  'Doctor']

};
RouteConstants.Doctor = {
  path: '/doctors',
  name: 'DOCTOR',
  role: ['Admin' ]

};
RouteConstants.Appointment = {
  path: '/appointments',
  name: 'APPPOINTMENT',
  role: ['Admin','Patient','Doctor']

};

RouteConstants.DoctorApprovals = {
  path: '/admin/approvals',
  name: 'DOCTOR_APPROVALS',
  role: ['Admin']
};





export default RouteConstants;
