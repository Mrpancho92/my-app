import {useContext, useEffect, useState, useCallback} from "react";
import "../../pages/schedule/schedulePage.scss";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import CancelModal from "../modal/CancelModal";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";



function AppointmentList() {
	const {activeAppointments, getActiveAppointments, appointmentloadingStatus} = useContext(AppointmentContext);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);


	useEffect(() => {
		getActiveAppointments();
		console.log('getActiveAppointments');
	}, []);


	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
	}, []);

	if (appointmentloadingStatus === 'loading') {
		return <Spinner/>
	} else if (appointmentloadingStatus === 'error') {
		return (
			<>
				<Error/>
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
				getActiveAppointments={getActiveAppointments}
				/>;
			})}
			<CancelModal handleClose={setIsOpen} selectedId={selectedId} isOpen={isOpen}/>
		</>
	);
}

export default AppointmentList;
