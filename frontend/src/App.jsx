import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Infobar/Infobar';
import * as sessionActions from './store/session'
import CharacterCreatePage from './components/Characters/CharacterCreation';


function Layout() {
const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <CharacterCreatePage/>
      }
         ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}


export default App;
