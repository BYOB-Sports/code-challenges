import {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import Toast from "./Toast";

const MAX_TOASTS = 3;

const ToastContainer = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => {
      const updated = [...prev, { id, message, type }];
      if (updated.length > MAX_TOASTS) updated.shift(); // remove oldest
      return updated;
    });
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useImperativeHandle(ref, () => ({ addToast }));

  return (
    <div
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2 
        flex flex-col items-center space-y-3 
        z-50 w-full max-w-sm px-4
      "
    >
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            animationDelay: `${index * 100}ms`, // stagger effect
          }}
          className="w-full flex justify-center animate-fade-slide-up"
        >
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
});

export default ToastContainer;
