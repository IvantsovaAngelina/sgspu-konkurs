import { nominations } from '../../helpers/nominationsList';
import Nomination from '../../components/nomin/Nomination';
import './style-nomin.css'

const Nominations = () => {
    return ( 
        <main className='nominMain'>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className ="nomiTitle">Номинации конкурса</h1>
                        {nominations.map((nominations, index) => {
                            return (
                                <Nomination  key = {index} title = {nominations.title} description = {nominations.description} index={index}/>
                            )
                                
                        })}
                    </div>
                </div>
               
            </div>
        </main>
     );
}
 
export default Nominations;