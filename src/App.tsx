import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/layout';
import FacilityLandingPage from './pages/HomePage';
import IssueReportForm from './pages/ReportIssue';
import ServiceRequestForm from './pages/RequestService';
import FeedbackForm from './pages/Feedback';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FacilityLandingPage />}/>
          <Route path="/report" element={<IssueReportForm />} />
          <Route path="/request" element={<ServiceRequestForm />} />
          <Route path="/feedback" element={<FeedbackForm />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes;