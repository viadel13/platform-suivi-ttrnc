import Navbar from '../Navbar/Index'
import SearchSuivi from '../SearchSuivi/Index';
import LineChartClient from '../Line/Index'

const Accueil = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <SearchSuivi />
        <LineChartClient />
      </div>

    </>
  )
}

export default Accueil
