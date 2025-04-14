import React from 'react';

interface FeedbackMessageProps {
    type?: 'success' | 'error' | 'info';
    message: string;
}

const styles: Record<'success' | 'error' | 'info', React.CSSProperties> = {
    success: { backgroundColor: 'green' },
    error: { backgroundColor: 'red' },
    info: { backgroundColor: 'blue' },
};

const baseStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0',
    color: '#fff',
    fontWeight: 'bold',
};

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ type = 'info', message }) => {
    const combinedStyle = { ...baseStyle, ...styles[type] };

    return <div style={combinedStyle}>{message}</div>;
};

export default FeedbackMessage;
