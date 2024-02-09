import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Heading from './components/Heading';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import TestStarting from './pages/TestStarting';
export default function App() {
	return (
		<div className='flex items-center flex-col'>
			<Heading
				title='Driving License Management System'
				className='font-semibold my-10 text-5xl'
			/>

			<BrowserRouter>
				<Routes>
					<Route path='/' element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/dashboard" element={<Dashboard />}/>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/test" element={<TestStarting/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
