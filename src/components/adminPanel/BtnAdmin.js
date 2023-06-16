import './style-adminPanel.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BtnAdmin = () => {
    const nav = useNavigate();

    const onRegistration = () => {
        nav(`/accountadmin/registerUser`)
    }

    const onAllUsers = () => {
        nav(`/accountadmin/allUsers`)
    }

    const onAllPictures = () => {
        nav(`/accountadmin/allPictures`)
    }

    const onAllOrganization = () => {
        nav(`/accountadmin/allOrganization`)
    }

    const onAllNominations = () => {
        nav(`/accountadmin/allNominations`)
    }

    const onAllRoles = () => {
        nav(`/accountadmin/allRoles`)
    }
    
    return ( 
        <div className="btnAdminPanel">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <button className='btn-admin' onClick={onRegistration}>Зарегистрировать пользоватлея</button>
                    <button className='btn-admin' onClick={onAllUsers}>Список пользователей</button>
                    <button className='btn-admin' onClick={onAllPictures}>Список плакатов</button>
                    <button className='btn-admin' onClick={onAllOrganization}>Список организаций</button>
                    <button className='btn-admin' onClick={onAllNominations}>Список номинаций</button>
                    <button className='btn-admin' onClick={onAllRoles}>Список ролей пользователей</button>
                </div>
            </div>
           
        </div>
     );
}
 
export default BtnAdmin;