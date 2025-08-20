import { useGetSubscription } from "./useGetSubscription";
import useSubscriptionModal from "./useSubscriptions"

type PayType = "monthly" | "yearly";

const usePaywall = ()=>{
    const{data: subscription, isLoading: isLoadingSubscription} = useGetSubscription()
    const subscriptionModal = useSubscriptionModal()
    const shouldBlock = isLoadingSubscription || !subscription?.active;
    return{
        isLoading: isLoadingSubscription,
        shouldBlock,
        triggerPaywall:(pay: PayType = "monthly")=>{
            subscriptionModal.onOpen(pay)
        }
    }
}


export default usePaywall