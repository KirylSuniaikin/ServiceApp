import {useQuery} from "@tanstack/react-query";
import {AppInfoService} from "@/services/appInfo.service";

export const useBaseInfo = () => {
    const {data:appInfo} = useQuery({
        queryKey: ['get app info'],
        queryFn: () => AppInfoService.getAppInfo()
    })
    return {appInfo}
}