import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Component } from "react";

import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";
import HistoryPage from "../../pages/history/HistoryPage";
import PageNotFound from '../../pages/404/404';


import "./app.scss";


interface TestProps {
	name: string;
}
interface TestState {
	age: number;
}
class Test extends Component<TestProps, TestState> {
	state: TestState = {
		age: 40
	}

	changeAge = () => {
		this.setState((state: TestState) => {
			return {age: this.state.age + 1};
		});
	};

	render() {
		return (
			<div>
				Name: {this.props.name}, Age: {this.state.age}
				<button onClick={this.changeAge}>Increase age</button>
			</div>
		)
	}
}


const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <PageNotFound/>,
		children: [
			{
				path: "/",
				element: <SchedulePage/>
			},
			{
				path: "/schedule",
				element: <SchedulePage/>
			},
			{
				path: "/history",
				element: <HistoryPage/>
			},
			{
				path: "/test",
				element: <Test name="Test"/>
			}
		]
	}
])

function App() {
	return <RouterProvider router={router}/>
}

function Root() {
	return (
		<main className="board">
			<Header />
			<AppointmentContextProvider>
				<Outlet />
			</AppointmentContextProvider>	
		</main>
	)
}

export default App;
