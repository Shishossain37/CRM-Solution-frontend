import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
// import Add from './Inventory/Add/Add';
import Edit from './Inventory/Edit/Edit';
import Inventory from './Inventory/Inventory';
import ViewPhoto from './Inventory/ViewPhoto/ViewPhoto';
import MainBody from './components/Home/MainBody';
import Welcome from './components/Welcome/Welcome';
import Accounts from './Accounts/Accounts';
import EditAccount from './Accounts/Edit/EditAccount';
import Employees from './Employees/Employees';
import EditEmployee from './Employees/Edit/EditEmployee';
import EditCustomers from './Customers/Edit/EditCustomers';
import Customers from './Customers/Customers';
import Editappointments from './Appointment/Edit/EditAppointment';
import Appointment from './Appointment/Appointment';
function App() {
  return (
    <>


      <Routes>

        <Route path='/account' element={<Accounts />} />
        <Route path='/employee' element={<Employees />} />
        <Route path='/customer' element={<Customers />} />
        <Route path='/appointment' element={<Appointment />} />

        <Route path='/' element={<MainBody />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/inventory' element={<Inventory />} />
        {/* <Route path='/add' element={<Add />} /> */}
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/accountedit/:id' element={<EditAccount />} />
        <Route path='/employee/:id' element={<EditEmployee />} />
        <Route path='/customer/:id' element={<EditCustomers />} />
        <Route path='/appointment/:id' element={<Editappointments />} />
        <Route path='/userprofile/:id' element={<ViewPhoto />} />
      </Routes>
    </>
  );
}

export default App;
