import { useEffect, useState, memo } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import dayjs from "dayjs";
import "./appointmentItem.scss";
import { Optional } from "utility-types";

// Вариант переиспользуемого типа 
// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
// type AppointmentsProps = Optional<IAppointment, 'canceled'>
// Или установить пакет npm i utility-types и использовать его возможности
type AppointmentsProps = Optional<IAppointment, 'canceled'> & {
	openModal: (state: number) => void;
	getActiveAppointments?: () => void;
	// selectId: () => void;
}

const AppointmentItem = memo(({id, date, name, service, phone, canceled, openModal, getActiveAppointments}: AppointmentsProps) => {
	const [timeLeft, changeTimeLeft] = useState<string | null>(null);
	useEffect(() => {
		changeTimeLeft(`${dayjs(date).diff(undefined, "h")}:${dayjs(date).diff(undefined, "m") % 60}`);
		const intervalId = setInterval(() => {
			if (dayjs(date).diff(undefined, "m") <= 0) {
				if (getActiveAppointments) {
					getActiveAppointments();
				}
				clearInterval(intervalId);
			} else {
				changeTimeLeft(`${dayjs(date).diff(undefined, "h")}:${dayjs(date).diff(undefined, "m") % 60}`);
			}	
		}, 6000)
		return () => {
			clearInterval(intervalId);
		}
	}, [date])
	const formattedDate = dayjs(date).format('DD/MM/YY/ HH:mm')
	console.log('render item');
	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formattedDate}</span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			{!canceled ? (
				<>
					<div className="appointment__time">
						<span>Time left:</span>
						<span className="appointment__timer">{timeLeft}</span>
					</div>
					<button className="appointment__cancel" 
					onClick={() => {
						openModal(id);
					}}>Cancel</button>
				</>
			) : null}
			{canceled ? <div className="appointment__canceled">Canceled</div> : null}
		</div>
	);
})

export default AppointmentItem;
