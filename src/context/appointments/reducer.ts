import { AppointmentAction, ActionsType } from "./actions";
import { IAppointment, ActiveAppointment } from '../../shared/interfaces/appointment.interface';
import { loadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
    allAppointments: IAppointment[] | [];
    activeAppointments: ActiveAppointment[] | [];
    appointmentloadingStatus: loadingStatusOptions;
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
        default:
            return state;
    }
}
