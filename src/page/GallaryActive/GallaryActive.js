import UnitGallary from '../../components/unitGallary/UnitGallary';
import './style-gallaryActive.css'

const GallaryActive = () => {
    return ( 
        <main>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <h1>Галерея конкурса</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='gallActive'>
                            <UnitGallary/> 
                        </div>
                    </div> 
                </div>
            </div>
         </main>
     );
}
 
export default GallaryActive;