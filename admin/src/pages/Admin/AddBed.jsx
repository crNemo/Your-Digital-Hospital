import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddBed = () => {
    const [bedImg, setBedImg] = useState(null);
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [speciality, setSpeciality] = useState('General');
    const [about, setAbout] = useState('');
    const [fees, setFees] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [contact, setContact] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (!bedImg) {
                return toast.error('Image is required');
            }

            formData.append('image', bedImg);

            formData.append('name', name);
            formData.append('details', details);
            formData.append('speciality', speciality);
            formData.append('about', about);
            formData.append('fees', Number(fees));
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
            formData.append('contact', contact);

            const { data } = await axios.post(backendUrl + '/api/beds/admin/add-bed', formData, {
                headers: { aToken },
            });

            if (data.success) {
                toast.success(data.message);
                setBedImg(null);
                setName('');
                setDetails('');
                setSpeciality('General');
                setAbout('');
                setFees('');
                setAddress1('');
                setAddress2('');
                setContact('');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message || 'An error occurred');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Add Bed</p>
            <div className="bg-white px-8 py-8 border border-transparent rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="bed-img">
                        <img
                            className="w-16 bg-gray-100 rounded-full cursor-pointer"
                            src={bedImg ? URL.createObjectURL(bedImg) : assets.upload_area}
                            alt="Bed Image"
                        />
                    </label>
                    <input
                        type="file"
                        id="bed-img"
                        hidden
                        onChange={(e) => setBedImg(e.target.files[0])}
                    />
                    <p>Upload bed image</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Bed Name</p>
                            <input
                                type="text"
                                placeholder="Name"
                                className="border rounded px-3 py-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Details</p>
                            <input
                                type="text"
                                placeholder="Details"
                                className="border rounded px-3 py-2"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input
                                type="number"
                                placeholder="Fee"
                                className="border rounded px-3 py-2"
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Contact</p>
                            <input
                                type="text"
                                placeholder="Contact Number"
                                className="border rounded px-3 py-2"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>

                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>
                            <select
                                className="border rounded px-3 py-2"
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                            >
                                <option value="General">General</option>
                                <option value="ICU">ICU</option>
                                <option value="Surgical">Surgical</option>
                                <option value="Pediatric">Pediatric</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address</p>
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                className="border rounded px-3 py-2"
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address Line 2"
                                className="border rounded px-3 py-2"
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mt-4 mb-2">About Bed</p>
                    <textarea
                        className="w-full px-4 pt-2 border rounded"
                        placeholder="Write about the bed"
                        rows={5}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    />

                    <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
                        Add Bed
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddBed;