import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer'
import Manager from './Components/Manager'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Manager />
      <Footer />
    </>
  )
}

export default App
