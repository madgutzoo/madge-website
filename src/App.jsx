import './App.css';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { Footer } from './Footer';
import { Background } from './Background';

function App() {
  return (
    <>
      <Background>
        <Header />
        <MainPage />
        <Footer />
      </Background>
    </>
  );
}

export default App;
