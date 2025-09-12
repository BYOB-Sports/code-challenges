import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-3" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default Loading;
