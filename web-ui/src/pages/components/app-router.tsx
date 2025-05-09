import {observer} from "mobx-react-lite";
import {Navigate, Route, Routes} from 'react-router-dom'
import React from "react";
import {OPEN_TICKETS_ROUTE} from "../../utils/consts";
import {authCustomerRoutes, authTaskerRoutes, publicRoutes} from "../../core/routes";
import {RouteType, UserTypeEnum} from "../../core/types";
import {HOME_PAGE_ROUTE} from "../../utils/consts";
import {useAppSelector} from "../../core/redux";

const AppRouter = observer(() => {
    const {user, userIsLoading, userError, isAuth} = useAppSelector(state => state.userReducer);
    return (
        <Routes>
            {isAuth && user.type === UserTypeEnum.CUSTOMER &&
                authCustomerRoutes.map(({ path, component: Component }: RouteType) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
            {isAuth && user.type === UserTypeEnum.TASKER &&
                authTaskerRoutes.map(({ path, component: Component }: RouteType) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
            {publicRoutes.map(({ path, component: Component }: RouteType) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route
                path='*'
                element={
                    (isAuth && user.type === UserTypeEnum.CUSTOMER) || user.type === UserTypeEnum.SIMPLE ? <Navigate to={HOME_PAGE_ROUTE} /> : <Navigate to={OPEN_TICKETS_ROUTE} />
                }
            />
        </Routes>
    );
});
export default AppRouter;