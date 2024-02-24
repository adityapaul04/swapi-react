import React from 'react';
import "./Modal.css";

const Modal = ({ isOpen, closeModal, residents, noResidents }) => {
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Residents</h2>
                {noResidents ? (
                    <p>No residents found for this planet.</p>
                ) : (
                    <ul>
                        {residents.map((resident, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {resident.name}<br />
                                <strong>Height:</strong> {resident.height}<br />
                                <strong>Mass:</strong> {resident.mass}<br />
                                <strong>Gender:</strong> {resident.gender}<br />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Modal;
