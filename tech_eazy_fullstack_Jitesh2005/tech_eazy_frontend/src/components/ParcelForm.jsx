import React, { useState, useEffect } from 'react';

const ParcelForm = ({ onSubmit, editData, clearEdit }) => {
    const [formData, setFormData] = useState({
        customer_name: '',
        delivery_address: '',
        contact_number: '',
        parcel_size: '',
        parcel_weight: ''
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            customer_name: '',
            delivery_address: '',
            contact_number: '',
            parcel_size: '',
            parcel_weight: ''
        });
        if (clearEdit) clearEdit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="customer_name" placeholder="Customer Name" value={formData.customer_name} onChange={handleChange} required />
            <input name="delivery_address" placeholder="Address" value={formData.delivery_address} onChange={handleChange} required />
            <input name="contact_number" placeholder="Contact" value={formData.contact_number} onChange={handleChange} required />
            <input name="parcel_size" placeholder="Size" value={formData.parcel_size} onChange={handleChange} required />
            <input name="parcel_weight" type="number" placeholder="Weight" value={formData.parcel_weight} onChange={handleChange} required />
            <button type="submit">{editData ? "Update" : "Add"} Parcel</button>
            {editData && <button onClick={clearEdit}>Cancel</button>}
        </form>
    );
};

export default ParcelForm;
