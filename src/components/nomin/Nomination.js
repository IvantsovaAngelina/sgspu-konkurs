import './style-nimin.css'

const Nomination = ({title, description, index}) => {
    return ( 
        <div className = "Three" index = {index}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <details>
                        <summary>
                           {title}
                        </summary>
                            <p>{description}</p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Nomination;