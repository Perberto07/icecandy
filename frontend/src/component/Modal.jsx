import './css/Modal.css';

function Modal({ show, onClose, onConfirm, message }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3>{message}</h3>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
