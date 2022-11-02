import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Test from './Test';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  );
}