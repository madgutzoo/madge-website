import './App.css';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { Footer } from './Footer';
import { Background } from './Background';
import { ThreeCanvas } from './ThreeCanvas';

function App() {
  return (
    <>
      <Background>
        <Header />
        <MainPage />
        <ThreeCanvas />
        <Footer />
      </Background>
    </>
  );
}

export default App;
