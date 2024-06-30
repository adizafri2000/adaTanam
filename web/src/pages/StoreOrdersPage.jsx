import {useUserCheck} from "../hooks/useUserCheck.jsx";
import {useFarmerCheck} from "../hooks/useFarmerCheck.jsx";


const StoreOrdersPage = () => {
    useUserCheck()
    useFarmerCheck()

    return (
        <div>
        <h1>Store Orders</h1>
        </div>
    );
}

export default StoreOrdersPage;