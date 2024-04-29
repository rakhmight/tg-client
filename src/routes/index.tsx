import { Route, Routes } from 'react-router-dom'

import Lobby from '@/views/lobby/Lobby'
import Control from '@/views/control/Control'
import Arena from '@/views/arena/Arena'
import Results from '@/views/results/Results'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Lobby />} />
    <Route path='/control' element={<Control />} />
    <Route path='/arena' element={<Arena />} />
    <Route path='/results' element={<Results />} />
  </Routes>
)

export default AppRoutes