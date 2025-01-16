import { RequestStatus } from "@/lib/types/request";
import { Dispatch, SetStateAction } from "react";

const RequestStatusStyles = {
    [RequestStatus.PENDING]: {
        container: "bg-negative-fill text-negative-text",
        icon: "text-negative-indicator",
    },
    [RequestStatus.APPROVED]: {
        container: "bg-warning-fill text-warning-text",
        icon: "text-warning-indicator",
    },
    [RequestStatus.COMPLETED]: {
        container: "bg-success-fill text-success-text",
        icon: "text-success-indicator",
    },
    [RequestStatus.REJECTED]: {
        container: "bg-danger-fill bg-danger-fill",
        icon: "text-danger-indicator",
    },
};

export default function Item(
    { status, setShowList = null, editRequests = undefined } : 
    { status: RequestStatus, setShowList: Dispatch<SetStateAction<boolean>> | null, editRequests?: (newStatus: string) => Promise<void> }) 
    {
    const styles = RequestStatusStyles[status];

    const handleClick = async () => {
        if (editRequests) {
            await editRequests(status);
        }
        if (setShowList) {
            setShowList(false);
        }
    };

    return (
        <div 
            className={`max-w-max flex justify-center items-center px-2 rounded-full ${styles.container} capitalize`} 
            onClick={handleClick}
        >
            <svg
                className={`w-2 h-2 me-2 ${styles.icon}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <circle cx="10" cy="10" r="10" />
            </svg>
            {status}
        </div>
    );
}