import React from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//Resolved issue 6 by adding a button to copy email to user's clipboard.
const copyEmail = async (email) => {
    try {
        await navigator.clipboard.writeText(email);
        alert("copied email")
    }
    catch (err) {
        alert("failed to copy email")
    }

    
}

const ContactModal = ({ isOpen, onClose, email, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Interested in {title}?</h2>
                    <p className="text-slate-400 mb-6">
                        Send the seller an email to arrange a pickup or for additional information!
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-2">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Seller Email</p>
                        <p className="text-lg text-blue-400 font-mono select-all">{email}</p>
                    </div>
                    <IconButton onClick = {() => copyEmail(email)}>
                        <ContentCopyIcon style = {{color : 'white'}} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;