import './App.css';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import RTList from './components/RemedyTripList/rt_list'; 

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <RTList /> 
        </section>
        <Footer />
      </main>
    </>
  );
}

export default App;
