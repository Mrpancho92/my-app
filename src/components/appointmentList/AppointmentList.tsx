import {useContext, useEffect, useState, useCallback} from "react";
import "../../pages/schedule/schedulePage.scss";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import CancelModal from "../modal/CancelModal";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";



function AppointmentList() {
	const {activeAppointments, getActiveAppointments, appointmentloadingStatus, calendarDate} = useContext(AppointmentContext);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);


	useEffect(() => {
		getActiveAppointments();
		console.log('getActiveAppointments');
	}, [calendarDate]);


	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
	}, []);

	if (appointmentloadingStatus === 'loading') {
		return <Spinner/>
	} else if (appointmentloadingStatus === 'error') {
		return (
			<>
				<Error msg={appointmentloadingStatus} 
				version="1.1"
				viewBox="0 0 499.973 391.157"
				xmlns="http://www.w3.org/2000/svg"
				style={{
				width: "100px",
				height: "100px",
				display: "block",
				margin: "0 auto",
			}}/>
				<button className="schedule__reload" onClick={getActiveAppointments}>
					Try to reload
				</button>
			</>
		)
	}
	console.log('render list');
	return (
		<>
			{activeAppointments.map((item) => {
				return <AppointmentItem 
				{...item} 
				key={item.id} 
				openModal={handleOpenModal} 
				loadHistory = {false}
				getActiveAppointments={getActiveAppointments}
				/>;
			})}
			<CancelModal handleClose={setIsOpen} selectedId={selectedId} isOpen={isOpen}/>
			{activeAppointments.length === 0 ? (
				<h2 className="no-data">No data to display</h2>
			) : null}
		</>
	);
}

export default AppointmentList;
