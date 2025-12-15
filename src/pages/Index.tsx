import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Heart, Link } from "lucide-react";
import chainsData from "@/data/Chains.json";

const Index = () => {
  const isMobile = useIsMobile();
  const [leftUrl, setLeftUrl] = useState("https://app.piteas.io/");
  const [rightUrl, setRightUrl] = useState("https://9x.9mm.pro/");
  const [leftFavorites, setLeftFavorites] = useState<string[]>([]);
  const [rightFavorites, setRightFavorites] = useState<string[]>([]);
  const [selectedChain, setSelectedChain] = useState<string | null>(null);

  const toggleLeftFavorite = (url: string) => {
    if (leftFavorites.includes(url)) {
      setLeftFavorites(leftFavorites.filter(fav => fav !== url));
    } else {
      setLeftFavorites([...leftFavorites, url]);
    }
  };

  const toggleRightFavorite = (url: string) => {
    if (rightFavorites.includes(url)) {
      setRightFavorites(rightFavorites.filter(fav => fav !== url));
    } else {
      setRightFavorites([...rightFavorites, url]);
    }
  };

  const isLeftFavorite = (url: string) => leftFavorites.includes(url);
  const isRightFavorite = (url: string) => rightFavorites.includes(url);

  const handleUrlChange = (url: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftUrl(url);
    } else {
      setRightUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Toolbar */}
      <div className="w-full bg-gray-800 border-b border-orange-500 p-2">
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row gap-4'} items-center justify-between`}>
          {/* Left Panel Controls */}
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={leftUrl}
              onChange={(e) => setLeftUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUrlChange(leftUrl, 'left')}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
              placeholder="Enter URL for left panel"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => toggleLeftFavorite(leftUrl)}
              className={isLeftFavorite(leftUrl) ? "text-red-500 hover:text-red-400" : "text-red-400 hover:text-red-300"}
            >
              <Heart className={`h-4 w-4 ${isLeftFavorite(leftUrl) ? 'fill-current' : ''}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  Favorites
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600">
                {leftFavorites.length === 0 ? (
                  <DropdownMenuItem disabled className="text-gray-400">No favorites yet</DropdownMenuItem>
                ) : (
                  leftFavorites.map((fav, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleUrlChange(fav, 'left')}
                      className="text-white hover:bg-gray-700 cursor-pointer"
                    >
                      {fav}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Chain Selector - Center */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="bg-orange-600 border-orange-500 text-white hover:bg-orange-500">
                  <Link className="h-4 w-4 mr-2" />
                  {selectedChain || "Select Chain"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600">
                {chainsData.chains.map((chain) => (
                  <DropdownMenuItem
                    key={chain.id}
                    onClick={() => setSelectedChain(chain.name)}
                    className="text-white hover:bg-gray-700 cursor-pointer"
                  >
                    {chain.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Right Panel Controls */}
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={rightUrl}
              onChange={(e) => setRightUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUrlChange(rightUrl, 'right')}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
              placeholder="Enter URL for right panel"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => toggleRightFavorite(rightUrl)}
              className={isRightFavorite(rightUrl) ? "text-red-500 hover:text-red-400" : "text-red-400 hover:text-red-300"}
            >
              <Heart className={`h-4 w-4 ${isRightFavorite(rightUrl) ? 'fill-current' : ''}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  Favorites
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600">
                {rightFavorites.length === 0 ? (
                  <DropdownMenuItem disabled className="text-gray-400">No favorites yet</DropdownMenuItem>
                ) : (
                  rightFavorites.map((fav, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleUrlChange(fav, 'right')}
                      className="text-white hover:bg-gray-700 cursor-pointer"
                    >
                      {fav}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`w-full h-[calc(100vh-80px)] flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 p-2`}>
        <div className="flex-1 bg-white border border-orange-500 rounded-lg shadow-sm overflow-hidden transition-all duration-300">
          <iframe
            src={leftUrl}
            className="w-full h-full border-0"
            title="Left webpage"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        <div className="flex-1 bg-white border border-orange-500 rounded-lg shadow-sm overflow-hidden transition-all duration-300">
          <iframe
            src={rightUrl}
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