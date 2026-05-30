import { Outlet } from 'react-router-dom';
import Box from '@components/common/Box';
import Sidebar from '@components/SideBar';

const LayoutContainer = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <Header /> */}
      <Box
        // component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#F9F9F9',
          display: 'flex',
        }}
      >
        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}
        <Box sx={{ width: { xs: '100%', md: '90%' },     p: { xs: 2, md: 3 },        // overall padding
    pt: { xs: 8, md: 3 }  , overflowY:  { xs: 'scroll', md: 'none' },  height: { xs: '90vh', md: '100vh' }
       }}> 
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutContainer;
