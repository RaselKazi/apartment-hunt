import React, { useEffect, useState } from 'react';
import Apartments from '../Apartments/Apartments';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import Services from '../Services/Services';
import PreLoader from '../../PreLoader/PreLoader';
import { useDispatch, useSelector } from 'react-redux';
import { listHouses } from '../../../actions/houseActions';

const Home = () => {
  document.title = 'Apartment Hunt';
  // const [apartments, setApartments] = useState([])

  const dispatch = useDispatch();
  const houseList = useSelector((state) => state.houseList);
  const { loading, error, houses } = houseList;

  // Get data from API and set the data:
  useEffect(() => {
    dispatch(listHouses());
  }, [dispatch]);

  return (
    <div className='overflow-hidden'>
      <NavBar />
      <Header />
      <section className='container my-4'>
        <div className='text-center'>
          <h6>House Rent</h6>
          <h2>
            Discover the latest Rent <br /> available today
          </h2>
          {loading ? (
            <PreLoader />
          ) : error ? (
            <p className='text-danger'>{error}</p>
          ) : (
            <div className='row'>
              {houses.map((apt) => (
                <Apartments apartment={apt} key={apt._id}></Apartments>
              ))}
            </div>
          )}
        </div>
      </section>
      <Services />
      <Footer />
    </div>
  );
};

export default Home;

{
  /* <PreLoader loading={loading} /> */
}
