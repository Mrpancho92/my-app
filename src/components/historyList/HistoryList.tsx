import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function HistoryList() {
	const {allAppointments, getAppointments, calendarDate} = useContext(AppointmentContext);
	const [loadHistory, setLoadHistory] = useState(false)
	useEffect(() => {
		getAppointments();
		setLoadHistory(true);
		return () => {
			setLoadHistory(false);
		}
	},[calendarDate])
	
	return (
		<>
			{allAppointments.sort((a, b) => {
				const c = new Date(a.date);
				const d = new Date(b.date);
				if (c > d) {
					return 1
				}
				if (c < d ) {
					return -1; 
				}
				return 0 
			}).map((item) => {
				return <AppointmentItem 
				{...item} 
				key={item.id}
				loadHistory = {loadHistory}
				openModal={() => {}} 
				/>;
			})}
			{allAppointments.length === 0 ? (
				<h2 className="no-data">No data to display</h2>
			) : null}
		</>
	);
}

export default HistoryList;
