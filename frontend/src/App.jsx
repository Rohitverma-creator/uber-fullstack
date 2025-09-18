import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => (
  
  <div>
 
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/login' element={<UserLogin />} />

      <Route path='/signup' element={<UserSignup />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/captain-signup' element={<CaptainSignUp />} />
      <Route path='/captain-Riding' element={<CaptainRiding/>}/>
      <Route path='/home' element={
     <UserProtectedWrapper>
         <Home />
     </UserProtectedWrapper>
        } />
   <Route path='user/logout' element={

     <UserProtectedWrapper>
      <UserLogout/>
     </UserProtectedWrapper>
   }/>
   <Route path='/captain-home' element={
    <CaptainProtectWrapper>
   <CaptainHome/>
    </CaptainProtectWrapper>
   }/>
   <Route path='/captain-logout' element={
    <CaptainProtectWrapper>
      <CaptainLogout/>
    </CaptainProtectWrapper>
   }/>
<Route path='/riding' element={<Riding/>}/>
    </Routes>
    
  </div>
)

export default App
