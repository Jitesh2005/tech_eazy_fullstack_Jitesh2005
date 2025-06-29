import React from 'react';

const ParcelTable = ({ parcels, onEdit, onDelete }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Tracking ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Size</th>
                    <th>Weight</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {parcels.map(parcel => (
                    <tr key={parcel.tracking_id}>
                        <td>{parcel.tracking_id}</td>
                        <td>{parcel.customer_name}</td>
                        <td>{parcel.delivery_address}</td>
                        <td>{parcel.contact_number}</td>
                        <td>{parcel.parcel_size}</td>
                        <td>{parcel.parcel_weight}</td>
                        <td>
                            <button onClick={() => onEdit(parcel)}>Edit</button>
                            <button onClick={() => onDelete(parcel.tracking_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ParcelTable;
