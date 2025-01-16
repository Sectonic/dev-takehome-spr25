
export default function TableSkeleton() {
    return (  
        <>
            {[...Array(7)].map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                    <td className="w-4 p-4">
                        <div className="flex justify-center items-center">
                            <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        </div>
                    </td>
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                    </th>
                    <td className="px-4 py-4">
                        <div className="h-2.5 bg-gray-300 rounded-full w-32"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
                    </td>
                </tr>
            ))}
        </>
    )
}