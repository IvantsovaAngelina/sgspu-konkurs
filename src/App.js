import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './style/main.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Nominations from './page/nomination/Nominations';
import Home from './page/Home/Home'
import Konkurs from './page/Konkurs/Konkurs'
import Gallary from './page/Gallary/Gallary'
import GallaryActive from './page/GallaryActive/GallaryActive'
import Registration from './page/Registration/Registration'
import Login from './page/Login/Login'
import PersonalAccountUser from './page/PersonalAccount_user/PersonalAccount_user';
import PersonalAccountJury from './page/PersonalAccount_jury/PersonalAccount_jury';
import PersonalAccountAdmin from './page/PersonalAccount_admin/PersonalAccount_admin';

// Admin Panel
import AdminRegistersUser from './components/adminPanel/AdminRegistaerUser';
import AllNominations from './components/adminPanel/AdminAllNominations'
import AllOrganization from './components/adminPanel/AdminAllOrganizations'
import AllPictures from './components/adminPanel/AdminAllPictures'
import AllRolles from './components/adminPanel/AdminAllRoles'
import AllUsers from './components/adminPanel/AdminAllUsers'

// import checkToken from './helpers/refreshToken';

function App() {

  // checkToken()

  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
          <Route path="/nomination" element={<Nominations/>}>
          </Route>
          <Route path="/rules" element={<Konkurs/>}>   
          </Route>
          <Route path="/archive" element={<Gallary/>}>
          </Route>
          <Route path="/gallery" element={<GallaryActive/>}>
          </Route>
          <Route path="/registration" element={<Registration/>}>
          </Route>
          <Route path="/login" element={<Login/>}>
          </Route>
          <Route path="/account/:id" element={<PersonalAccountUser/>}>
          </Route>
          <Route path="/accountjury/:id" element={<PersonalAccountJury/>}>
          </Route>
          <Route path="/accountadmin/:id" element={<PersonalAccountAdmin/>}>
          </Route>
          {/* Admin Panel */}
          <Route path="/accountadmin/registerUser" element={<AdminRegistersUser/>}>
          </Route>
          <Route path="/accountadmin/allUsers" element={<AllUsers/>}>
          </Route>
          <Route path="/accountadmin/allPictures" element={<AllPictures/>}>
          </Route>
          <Route path="/accountadmin/allOrganization" element={<AllOrganization/>} >
          </Route>
          <Route path="/accountadmin/allRoles"  element={<AllRolles/>}>
          </Route>
          <Route path="/accountadmin/allNominations" element={<AllNominations/>}>
          </Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
