import {AppDispatch, RootState} from "../redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../redux/action-creators";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppActions = () => {
    const dispatch = useTypedDispatch();
    return bindActionCreators(actionCreators, dispatch);
}