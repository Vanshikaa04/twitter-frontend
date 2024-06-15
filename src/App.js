import { UserProvider } from './components/context/UserContext';
import { MainRouter } from './routers/Routers';


function App() {
  return (
    <UserProvider>
      <MainRouter />
    </UserProvider>
  );
}

export default App;
