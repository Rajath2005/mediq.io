import React, { useEffect, useState } from 'react';

const AlertMessage = ({ type = 'info', message = '', autoDismiss = true, duration = 5000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer;
    if (autoDismiss) {
      timer = setTimeout(() => {
        setShow(false);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [autoDismiss, duration]);

  if (!show || !message) return null;

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show mt-3`}
      role="alert"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {message}
      <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
    </div>
  );
};

export default AlertMessage;
