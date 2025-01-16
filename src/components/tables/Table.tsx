import { RequestStatus } from "@/lib/types/request";
import Dropdown from "../atoms/Dropdown/Dropdown";
import TableSkeleton from "./Skeleton";
import { RequestItem } from "@/lib/db/types";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Item from "../atoms/Dropdown/Item";
import { useRouter } from "next/navigation";
import Pagination from "../molecules/Pagination";

export default function RequestTable({ setError }: { setError: Dispatch<SetStateAction<string>> }) {
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<string>("");
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [selectedRequests, setSelectedRequests] = useState<RequestItem[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchRequests = async (status = "", page = 1) => {
        setIsEmpty(false);
        setRequests([]);
        setSelectedRequests([]);
        const req = await fetch('/api/request?' + new URLSearchParams({ status, page: String(page) }));
        if (req.ok) {
            const data = await req.json();
            setRequests(data.items);
            setIsEmpty(data.isEmpty);
            setTotalCount(data.totalCount);
        } else {
            setError('Requests unable to load.');
        }
    };

    const deleteRequests = async () => {
        const selectedRequestIds = selectedRequests.map(req => req.id);
        const req = await fetch('/api/requests', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedRequestIds }),
        });
        if (req.ok) {
            router.refresh();
            fetchRequests(status, page);
        } else {
            setError('Requests unable to be deleted.');
        }
    }

    const editRequests = async (newStatus: string) => {
        const selectedRequestIds = selectedRequests.map(req => req.id);
        const req = await fetch('/api/requests', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedRequestIds, status: newStatus }),
        });
        if (req.ok) {
            router.refresh();
            fetchRequests(status, page);
        } else {
            setError('Requests unable to be edited.');
        }
    }

    const changePage = async (newPage: number) => {
        await fetchRequests(status, newPage);
        setPage(newPage);
    }

    const changeStatus = async (newStatus: string) => {
        await fetchRequests(newStatus, 1);
        setStatus(newStatus);
        setPage(1);
    }

    useEffect(() => {
        (async () => {
            fetchRequests(status, page);
        })();
    }, []);

    const isRequestSelected = (request: RequestItem) => 
        request && request.id && selectedRequests.some(req => req && req.id === request.id);    

    const toggleRequestSelection = (request: RequestItem) => {
        setSelectedRequests(prev => 
            isRequestSelected(request)
                ? prev.filter(req => req.id !== request.id)
                : [...prev, request]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRequests.length === requests.length) {
            setSelectedRequests([]);
        } else {
            setSelectedRequests(requests);
        }
    };

    return (
        <>
            <div className="mt-6 w-full flex max-md:gap-2 max-md:flex-col md:justify-between items-start md:items-center">
                <h2 className="font-bold">Request Table</h2>
                <div className="flex justify-end items-center gap-3">
                    <div className="flex gap-2 items-center text-sm">
                        Mark As <Dropdown disabled={selectedRequests.length === 0} editRequests={editRequests} />
                    </div>
                    <div className="w-[1px] h-[30px] rounded bg-gray-300"></div>
                    <button disabled={selectedRequests.length === 0} onClick={() => deleteRequests()}>
                        <svg className="w-5 h-5 fill-gray-400 transition hover:fill-gray-600" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                    </button>
                </div>
            </div>
            <div className="mt-4 w-full flex justify-start items-center gap-2 overflow-x-auto">
                <button 
                    type="button"
                    onClick={() => changeStatus("")}
                    className={`py-3 px-5 ${ status == "" ? 'bg-primary text-gray-100' : 'bg-gray-100 text-gray-500'} rounded-lg text-sm font-semibold capitalize cursor-pointer`}
                >
                    All
                </button>
                {Object.values(RequestStatus).map((currentStatus, idx) => (
                    <button
                        key={idx} 
                        type="button"
                        className={`py-3 px-5 ${currentStatus == status ? 'bg-primary text-gray-100' : 'bg-gray-100 text-gray-500'} rounded-lg text-sm font-semibold capitalize cursor-pointer`}
                        onClick={() => changeStatus(currentStatus.toString())}
                    >
                        {currentStatus}
                    </button>
                ))}
            </div>
            <div className="max-md:overflow-x-auto w-full">
                <table className="mt-2 text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                        onChange={toggleSelectAll}
                                        checked={selectedRequests.length === requests.length && requests.length > 0}
                                    />
                                    <label htmlFor="checkbox-all" className="sr-only">
                                        Select All
                                    </label>
                                </div>
                            </th>
                            {["Name", "Item Requested", "Created", "Updated", "Status"].map((heading, idx) => (
                                <th
                                    key={idx}
                                    scope="col"
                                    className="px-6 py-3 whitespace-nowrap"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 && !isEmpty && <TableSkeleton />}
                        {(requests.length < 6 ? [...requests, ...new Array(6 - requests.length).fill(null)] : requests).map((item, idx) => {
                            const selected = isRequestSelected(item);
                            return (
                            <tr
                                key={idx}
                                className={`${selected ? 'bg-primary-fill' : 'bg-white'} border-b`}
                            >
                                <td className="w-4 p-4">
                                <div className="flex justify-center items-center h-4">
                                    { item && (
                                        <>
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded"
                                                onChange={() => toggleRequestSelection(item)}
                                                checked={selected}
                                            />
                                            <label htmlFor={`checkbox-table-${idx + 1}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </>
                                    ) }
                                </div>
                                </td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {item ? item.requestorName : ""}
                                </th>
                                <td className="px-6 py-4">{item ? item.itemRequested : ""}</td>
                                <td className="px-6 py-4" suppressHydrationWarning>{item ? item.createdDate : ""}</td>
                                <td className="px-6 py-4" suppressHydrationWarning>{item ? item.lastEditedDate : ""}</td>
                                <td className="px-6 py-4 min-w-[160px]">
                                    {item ? <Item status={item.status} setShowList={null} editRequests={undefined} /> : null}
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                </table>
            </div>
            <Pagination
                totalRecords={totalCount}
                pageSize={requests.length}
                pageNumber={page}
                onPageChange={changePage}
            />
        </>
    );
}