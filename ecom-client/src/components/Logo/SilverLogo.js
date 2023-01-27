import { Link } from 'react-router-dom';
import './SilverLogo.css'
function SilverLogo(){
    return(
        <Link to="/" className='group'>
            <h1 className='toplogo'>Age of</h1>
            <h2 className='botlogo'>Silver</h2>
        </Link>
    )
}
export default SilverLogo;