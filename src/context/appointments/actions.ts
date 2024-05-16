import {
    IAppointment,
    ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";


export enum ActionsType {
    SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
    SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
    FETCHING_APPOINTMENTS = "FETCHING_APPOINTMENTS",
    ERROR_FETCHING_APPOINTMENTS = "ERROR_FETCHING_APPOINTMENTS"
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
}