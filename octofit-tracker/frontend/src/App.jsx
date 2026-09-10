import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const links = [
  ['Users', '/users'],
  ['Teams', '/teams'],
  ['Activities', '/activities'],
  ['Leaderboard', '/leaderboard'],
  ['Workouts', '/workouts'],
]

function Home() {
  return (
    <div className="text-center py-5">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track activity, build teams, and reach your fitness goals.</p>
    </div>
  )
}

function App() {
  return (
    <div className="container py-4">
      <header className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <NavLink className="text-decoration-none text-dark" to="/">
          <h1 className="h3 mb-0">OctoFit Tracker</h1>
        </NavLink>
        <nav className="nav nav-pills" aria-label="Primary navigation">
          {links.map(([label, path]) => (
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              key={path}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Workouts />} path="/workouts" />
        </Routes>
      </main>
    </div>
  )
}

export default App
