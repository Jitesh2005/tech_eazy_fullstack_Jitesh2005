import React, { useEffect, useState } from 'react';
import api from './api';
import ParcelForm from './components/ParcelForm';
import ParcelTable from './components/ParcelTable';

const App = () => {
    const [parcels, setParcels] = useState([]);
    const [editParcel, setEditParcel] = useState(null);

    const loadParcels = async () => {
        const res = await api.get('/parcels');
        setParcels(res.data);
    };

    const createParcel = async (data) => {
        if (editParcel) {
            await api.put(`/parcels/${editParcel.tracking_id}`, data);
        } else {
            await api.post('/parcels', data);
        }
        loadParcels();
    };

    const deleteParcel = async (id) => {
        await api.delete(`/parcels/${id}`);
        loadParcels();
    };

    const handleEdit = (parcel) => {
        setEditParcel(parcel);
    };

    useEffect(() => {
        loadParcels();
    }, []);

    return (
        <div>
            <h2>Parcel Manager</h2>
            <ParcelForm onSubmit={createParcel} editData={editParcel} clearEdit={() => setEditParcel(null)} />
            <ParcelTable parcels={parcels} onEdit={handleEdit} onDelete={deleteParcel} />
        </div>
    );
};

export default App;
