import { AppointmentAction, ActionsType } from "./actions";
import { IAppointment, ActiveAppointment } from '../../shared/interfaces/appointment.interface';
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
import { loadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
    allAppointments: IAppointment[] | [];
    activeAppointments: ActiveAppointment[] | [];
    appointmentloadingStatus: loadingStatusOptions;
    calendarDate: LooseValue;
}

export default function reducer(state: IAppointmentState, action: AppointmentAction): IAppointmentState {
    switch (action.type) {
        case ActionsType.SET_ALL_APPOINTMENTS:
            return { ...state, allAppointments: action.payload, appointmentloadingStatus: 'idle' };
        case ActionsType.SET_ACTIVE_APPOINTMENTS:
            return { ...state, activeAppointments: action.payload, appointmentloadingStatus: 'idle' };
        case ActionsType.FETCHING_APPOINTMENTS:
            return { ...state, appointmentloadingStatus: 'loading' };
        case ActionsType.ERROR_FETCHING_APPOINTMENTS:
            return { ...state, appointmentloadingStatus: 'error' };
        case ActionsType.SET_CALENDAR_DATE:
            return { ...state, calendarDate: action.payload };
        default:
            return state;
    }
}
