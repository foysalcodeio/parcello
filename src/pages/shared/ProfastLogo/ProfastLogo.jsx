import logo from '../../../assets/logo.png';

const ProfastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-3xl -ml-2 font-extrabold'>Parcello</p>
        </div>
    );
};

export default ProfastLogo;