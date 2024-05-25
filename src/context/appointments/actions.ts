import {
    IAppointment,
    ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";


export enum ActionsType {
    SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
    SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
    FETCHING_APPOINTMENTS = "FETCHING_APPOINTMENTS",
    ERROR_FETCHING_APPOINTMENTS = "ERROR_FETCHING_APPOINTMENTS",
    SET_CALENDAR_DATE = "SET_CALENDAR_DATE"
}

export type AppointmentAction = {
    type: ActionsType.SET_ACTIVE_APPOINTMENTS;
    payload: ActiveAppointment[]
} | {
    type: ActionsType.SET_ALL_APPOINTMENTS
    payload: IAppointment[]
} | {
    type: ActionsType.FETCHING_APPOINTMENTS
} | {
    type: ActionsType.ERROR_FETCHING_APPOINTMENTS
} | {
    type: ActionsType.SET_CALENDAR_DATE
    payload: LooseValue;
}