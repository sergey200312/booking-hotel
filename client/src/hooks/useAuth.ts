import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export const useAuth = (): boolean => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
    
    return isAuth
}