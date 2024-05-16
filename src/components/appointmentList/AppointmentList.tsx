import {useContext, useEffect} from "react";
import "../../pages/schedule/schedulePage.scss";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {activeAppointments, getActiveAppointments, appointmentloadingStatus} = useContext(AppointmentContext);
	useEffect(() => {
		getActiveAppointments();
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
	return (
		<>
			{activeAppointments.map((item) => {
				return <AppointmentItem {...item} key={item.id} />;
			})}

		</>
	);
}

export default AppointmentList;
