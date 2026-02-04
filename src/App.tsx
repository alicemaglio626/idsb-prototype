import '@datavant/dart/styles.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mantine/core';
import {
  DatavantProvider,
  SideNav,
  NavItem,
  SearchIcon,
  FolderIcon,
  FileCabinetIcon,
  LockIcon,
  HelpIcon,
  PlusIcon,
} from '@datavant/dart';
import { ProjectDashboard } from './pages/ProjectDashboard';
import { CreateStudy } from './pages/CreateStudy';
import { HEORDataDiscovery } from './pages/HEORDataDiscovery';
import { HEORContracting } from './pages/HEORContracting';
import { HEORDataCombination } from './pages/HEORDataCombination';
import { HEORPrivacy } from './pages/HEORPrivacy';
import { HEORAutomaticInsights } from './pages/HEORAutomaticInsights';
import { HEOREvidenceGeneration } from './pages/HEOREvidenceGeneration';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProjectClick = (projectId: string) => {
    if (projectId === 'heor') {
      navigate('/heor/discovery');
    } else if (projectId === 'gps') {
      // Will add GPS flow later
      console.log('GPS project clicked - not yet implemented');
    }
  };

  return (
    <DatavantProvider environment="staging">
      <Box style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <SideNav
          topSections={[
            {
              children: (
                <NavItem
                  label="Dashboard"
                  leftSection={<SearchIcon />}
                  active={location.pathname === '/'}
                  onClick={() => navigate('/')}
                />
              ),
            },
            {
              label: 'PLATFORM',
              children: [
                <NavItem
                  label="My Studies"
                  leftSection={<FolderIcon />}
                  key="studies"
                  active={location.pathname === '/my-studies'}
                  onClick={() => navigate('/my-studies')}
                />,
                <NavItem
                  label="Create New Study"
                  leftSection={<PlusIcon />}
                  key="create-study"
                  active={location.pathname === '/create-study'}
                  onClick={() => navigate('/create-study')}
                />,
                <NavItem
                  label="Data Sources"
                  leftSection={<FileCabinetIcon />}
                  key="data-sources"
                  active={location.pathname === '/data-sources'}
                  onClick={() => navigate('/data-sources')}
                />,
                <NavItem
                  label="Privacy & Compliance"
                  leftSection={<LockIcon />}
                  key="privacy"
                  active={location.pathname === '/privacy'}
                  onClick={() => navigate('/privacy')}
                />,
              ],
            },
          ]}
          bottomSections={[
            {
              children: <NavItem label="Help & Support" leftSection={<HelpIcon />} />,
            },
          ]}
          userNavItemProps={{
            isExpanded: true,
            username: 'Vinay Mehta',
            email: 'vinay.mehta@lilly.com',
            initials: 'VM',
            onClick: () => console.log('User menu clicked'),
          }}
        />

        <Box
          style={{
            flex: 1,
            height: '100vh',
            overflow: 'auto',
            backgroundColor: 'var(--mantine-color-gray-0)',
          }}
        >
          <Routes>
            <Route path="/" element={<ProjectDashboard onProjectClick={handleProjectClick} />} />
            <Route path="/create-study" element={<CreateStudy />} />
            <Route path="/heor/discovery" element={<HEORDataDiscovery onContinue={() => navigate('/heor/contracting')} />} />
            <Route path="/heor/contracting" element={<HEORContracting onContinue={() => navigate('/heor/data-combination')} />} />
            <Route path="/heor/data-combination" element={<HEORDataCombination onContinue={() => navigate('/heor/privacy')} />} />
            <Route path="/heor/privacy" element={<HEORPrivacy onContinue={() => navigate('/heor/insights')} />} />
            <Route path="/heor/insights" element={<HEORAutomaticInsights onContinue={() => navigate('/heor/evidence')} />} />
            <Route path="/heor/evidence" element={<HEOREvidenceGeneration onContinue={() => navigate('/')} />} />
          </Routes>
        </Box>
      </Box>
    </DatavantProvider>
  );
}

export default App;
