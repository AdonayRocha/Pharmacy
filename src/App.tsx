import './App.css';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import RemedyTrip from './components/RemedyTrip/remedy_trip';

function App() {
  return (
    <>
      <main>
        <Header />
        <section>
          <RemedyTrip />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default App;
