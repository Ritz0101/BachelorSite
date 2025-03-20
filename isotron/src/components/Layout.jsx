import { Outlet } from 'react-router-dom';
import Header from './header';

function Layout() {
  return (
    <div className="min-h-screen bg-light-purple">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout; 