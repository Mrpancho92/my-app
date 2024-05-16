import React, { createContext, useReducer } from "react";
import reducer, {IAppointmentState} from "./reducer";
import useAppointmentService from '../../services/AppointmentService'
import { ActionsType } from "./actions";

const initialState: IAppointmentState = {
	allAppointments: [],
	activeAppointments: [],
    appointmentloadingStatus: 'idle'
}

interface ProviderProps {
    children: React.ReactNode
}
interface AppointmentContextValue extends IAppointmentState {
    getAppointments: () => void;
    getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    appointmentloadingStatus: initialState.appointmentloadingStatus,
    getAppointments: () => {},
    getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({children}: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer,initialState);
    const {loadingStatus, getAllAppointments, getAllActiveAppointments} = useAppointmentService();
   ;
    const value: AppointmentContextValue = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        appointmentloadingStatus: loadingStatus,
        getAppointments: () => {
            getAllAppointments().then(data => dispatch({type: ActionsType.SET_ALL_APPOINTMENTS, payload: data}));  
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then(data => dispatch({type: ActionsType.SET_ACTIVE_APPOINTMENTS, payload: data}));  
        },
    }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )
}
export default AppointmentContextProvider;