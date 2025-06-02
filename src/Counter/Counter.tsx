import React, { useState } from 'react';
import './Counter.css';
import { useSelector, useDispatch } from 'react-redux';
import type {RootState} from '../store';

function AddedItem({ item, onEdit, onDelete }) {
    return (
        <div  className={"addedItem"}>
            <p>{item.name}</p>
            <p>{item.amount}</p>
            <button onClick={() => onEdit(item.id)}>Fix</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
    );
}

export default function Counter() {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.counter.items);
    const editedId = useSelector((state: RootState) => state.counter.editedId);

    const [form, setForm] = useState({ name: '', amount: 0 });

    const handleSave = () => {
        if (editedId === null) {
            dispatch({ type: 'ADD_ITEM', payload: { ...form } });
        } else {
            dispatch({ type: 'CHANGE_ITEM', payload: { id: editedId, ...form } });
        }
        setForm({ name: '', amount: 0 });
    };
    const handleCancel = () => {
        dispatch({ type: 'CANCEL_ITEM' });
        setForm({ name: '', amount: 0 });
    };

    const handleEdit = (id: number) => {
        const item = items.find(item => item.id === id);
        if (item) {
            setForm({ name: item.name, amount: item.amount });
            dispatch({ type: 'START_EDIT', payload: { id } });
        }
    };

    const handleDelete = (id: number) => {
        dispatch({ type: 'DELETE_ITEM', payload: { id } });
    };

    const filter = useSelector((state: RootState) => state.counter.filter);
    const filteredItems = items.filter(item =>
        (item.name || "").toLowerCase().includes((filter || "").toLowerCase())
    );
    return (
        <div className="container">
            <div className="forms">
                <input
                    type="text"
                    placeholder="Фильтр"
                    value={filter}
                    onChange={e => dispatch({ type: 'SET_FILTER', payload: { filter: e.target.value } })}
                />
                <input
                    type="number"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: parseInt(e.target.value) })}
                    placeholder="amount"
                    className="form"
                />
                <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="name"
                    className="form"
                />
                <button  className="btn" onClick={handleSave}>Save</button>
                <button className="btn" onClick={handleCancel}>Cancel</button>
            </div>

            {filteredItems.map(item => (
                <AddedItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
