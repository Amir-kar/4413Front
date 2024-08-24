import { Footer, Header } from './components';
import { AllRoutes } from './routes/AllRoutes';

function App() {


  //<Header />  Header
  //<AllRoutes /> Main Body
  //<Footer />  Footer
  return (
    <>
      
      <div className="App dark:bg-slate-800">
        <Header />
        <AllRoutes />
        <Footer />
      </div>
      
    </>
  );
}

export default App;