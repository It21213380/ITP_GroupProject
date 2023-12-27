import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CreateTicket } from "./components/ticket-add.component";
import { TicketList } from './components/ticket-list.component';

import { CusTicketList } from './components/custicket-list.component';
import { CreateCusTicket } from './components/custicket-add.component';

import { TourPackageList } from './components/tourpackage-list.component';
import { CreateTour } from './components/tourpackage-add.component';
import { TourList } from './components/adtourpackage.list.component';

import { InquiryList } from './components/inquiry-list.component';
import { CreateInquiry } from './components/inquiry-add.component';

import { GuideList } from './components/guide-list.component';
import { CreateGuide } from './components/guide-add.component';
import { GuidePackList } from './components/guidePack-list.component';

import { SpaceProviderList } from './components/spaceProvider-list.component';
import { CreateSpaceProvider } from './components/spaceProvider-add.component';

import { SpaceList } from './components/space-list.component';
import SpacePage from './components/space-page.component';

import { CreateSpace } from './components/space-add.component';

import { AdInquiryList } from './components/adInquiry-list.component';
import { GuidePackAdminList } from './components/guidePackAdmin-list.component';

import { UserList } from './components/user-list.component';
import { CreateUser } from './components/user-add.component';

import { PaymentList } from './components/payment-list.component';


import CreateGuidePackage from './components/guidePackAdmin-add.component';
import Layout from './features/Layout';
import Home from './features/Home';
import SignUp from './features/SignUp';
import Login from './features/Login';
import DashLayout from './features/DashLayout'
import DashBoard from './features/DashBoard'
import SpaceBrowse from './components/space-browse.component';
import TourPage from './components/tour-page.component';
import TourBrowse from './components/tour-browse.component';
import PaymentPage from './components/payment-page.component';
import PaymentConfirmPage from './components/payment-confirm.component';
import AdminDashBoard from './features/AdminDashboard';
import { UserPaymentList } from './components/payment-list-for-users.component';
import ServiceDashBoard from './features/ServiceDashboard';
import { UserSpaceList } from './components/space-list-for-users.component';
import PaymentInformation from './components/payment-information-add.component';
import PaymentInformationView from './components/payment-information-view.component';
import PaymentInformationUpdate from './components/payment-information-update.component';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<Login />} />

            <Route path='dashboard' element={<DashLayout />}>
              <Route index element={<DashBoard />} />
              <Route path='spaces' element={<SpaceList />} />
              <Route path="spaceProvider" element={<SpaceProviderList />} />
              <Route exact path="payment-list" element={<UserPaymentList/>}/>
            </Route>
            
            <Route path='serviceDashboard' element={<DashLayout />}>
              <Route index element={<ServiceDashBoard />} />
              <Route path='spaces' element={<UserSpaceList />} />
              <Route path="spaceProvider" element={<SpaceProviderList />} />
              <Route exact path="payment-info">
                <Route index element={<PaymentInformation />} />
                <Route path='view' element={<PaymentInformationView />} />
                <Route path='update' element={<PaymentInformationUpdate />} />
              </Route>
            </Route>

            <Route path='adminDashboard' element={<DashLayout />}>
              <Route index element={<AdminDashBoard />} />
              <Route path='spaces' element={<SpaceList />} />
              <Route path="spaceProvider" element={<SpaceProviderList />} />
              <Route exact path="payment-list" element={<PaymentList/>}/>
            </Route>

            <Route exact path="/createTicket" element={<CreateTicket />} />
            <Route exact path="/ticket" element={<TicketList />} />

            <Route exact path="/createCustomerTicket" element={<CreateCusTicket />} />
            <Route exact path="/customerTicket" element={<CusTicketList />} />

            <Route path='/tour' >
              <Route index element={<TourPackageList />} />
              <Route path=':_id' element={<TourPage />} />
            </Route>

            <Route exact path="/createTour" element={<CreateTour />} />

            <Route exact path="/adTourPackageList" element={<TourList />} />

            <Route exact path="/inquiry" element={<InquiryList />} />
            <Route exact path="/createInquiry" element={<CreateInquiry />} />

            <Route exact path="/spaceProvider" element={<SpaceProviderList />} />
            <Route exact path="/createSpaceProvider" element={<CreateSpaceProvider />} />

            <Route path='/space' >
              <Route index element={<SpaceList />} />
              <Route path=':_id' element={<SpacePage />} />
            </Route>

            <Route exact path="/createSpace" element={<CreateSpace />} />

            <Route exact path="/adInquiry" element={<AdInquiryList />} />

            <Route exact path="/guide" element={<GuideList />} />
            <Route exact path="/createGuide" element={<CreateGuide />} />
            <Route exact path="/guidePack" element={<GuidePackList />} />

            <Route exact path="/guidePackAdmin" element={<GuidePackAdminList />} />
            <Route exact path="/createGuidePack" element={<CreateGuidePackage />} />

            <Route exact path="/user" element={<UserList />} />
            <Route exact path="/createUser" element={<CreateUser />} />

            <Route exact path="/payment/:type/:_id" element={<PaymentConfirmPage />} />

            <Route exact path="/payment-list/" element={<PaymentList />} />
            <Route exact path="/payment-page/" element={<PaymentPage />} />


          </Route>
        </Routes>
      </Router>

    </div>
  );

}

export default App;
