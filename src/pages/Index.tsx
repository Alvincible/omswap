import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`w-full h-screen flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 p-2`}>
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300">
          <iframe
            src="https://example.com"
            className="w-full h-full border-0"
            title="Left webpage"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300">
          <iframe
            src="https://example.com"
            className="w-full h-full border-0"
            title="Right webpage"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;