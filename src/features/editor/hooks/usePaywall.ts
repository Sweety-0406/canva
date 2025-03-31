import { useGetSubscription } from "./useGetSubscription";
import useSubscriptionModal from "./useSubscriptions"


const usePaywall = ()=>{
    const{data: subscription, isLoading: isLoadingSubscription} = useGetSubscription()
    const subscriptionModal = useSubscriptionModal()
    const shouldBlock = isLoadingSubscription || !subscription?.active;
    console.log(shouldBlock)
    return{
        isLoading: isLoadingSubscription,
        shouldBlock,
        triggerPaywall:()=>{
            subscriptionModal.onOpen()
        }
    }
}


export default usePaywall