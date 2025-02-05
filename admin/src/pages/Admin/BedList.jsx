import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const BedList = () => {
    const { aToken, getAllBeds, beds, changeBedAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllBeds();
        }
    }, [aToken, getAllBeds]);

    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <h1 className="text-lg font-medium">All Beds</h1>
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {beds && beds.map((bed, index) => (
                    <div
                        key={index}
                        className="border border-indigo-200 rounded-x1 max-w-56 overflow-hidden cursor-pointer group"
                    >
                        <img
                            className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                            src={bed.image}
                            alt={bed.name}
                        />
                        <div className="p-4">
                            <p className="text-neutral-800 text-lg font-medium">{bed.name}</p>
                            <p className="text-zinc-600 text-sm">{bed.speciality}</p>
                            <div className='mt-2 flex items-center gap-1 text-sm'>
                                <input onChange={() => changeBedAvailability(bed._id)} type="checkbox" checked={bed.available} />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BedList;