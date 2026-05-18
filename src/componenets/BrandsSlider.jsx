import asusLogo from '../assets/brands/asus.svg'
import samsungLogo from '../assets/brands/samsung.svg'
import intelLogo from '../assets/brands/intel.svg'
import lenovoLogo from '../assets/brands/lenovo.svg'
import lenovooLogo from '../assets/brands/lenovoo.svg'
import logitechLogo from '../assets/brands/logitech.svg'
import hpLogo from '../assets/brands/hp.svg'

function BrandsSlider() {
    return (
        <div className='flex justify-between w-600 mx-4 sm:mx-10 my-10 scroll'>
            <img src={asusLogo} width={150} alt="asus" />
            <img src={intelLogo} width={150} alt="intel" />
            <img src={lenovoLogo} width={150} alt="lenovo" />
            <img src={logitechLogo} width={150} alt="logitech" />
            <img src={hpLogo} width={150} alt="hp" />
            <img src={samsungLogo} width={150} alt="samsung" />

            <img src={asusLogo} width={150} alt="asus" />
            <img src={intelLogo} width={150} alt="intel" />
            <img src={lenovoLogo} width={150} alt="lenovo" />
            <img src={logitechLogo} width={150} alt="logitech" />
            <img src={hpLogo} width={150} alt="hp" />
            <img src={samsungLogo} width={150} alt="samsung" />
        </div>
    )
}
export default BrandsSlider