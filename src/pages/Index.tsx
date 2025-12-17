import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink } from "lucide-react";
import chainsData from "@/data/Chains.json";

// Import all chain website data
import xchData from "@/data/XCH.json";
import ethData from "@/data/ETH.json";
import baseData from "@/data/BASE.json";
import bscData from "@/data/BSC.json";
import plsData from "@/data/PLS.json";
import sData from "@/data/S.json";

interface Website {
  url: string;
  name: string;
}

const chainWebsites: Record<string, Website[]> = {
  XCH: xchData.websites,
  ETH: ethData.websites,
  BASE: baseData.websites,
  BSC: bscData.websites,
  PLS: plsData.websites,
  S: sData.websites,
};

// Sites that block iframe embedding
const nonEmbeddableSites = ["kyberswap.com", "matcha.xyz"];

const isEmbeddable = (url: string) => {
  return !nonEmbeddableSites.some(site => url.includes(site));
};

const Index = () => {
  const isMobile = useIsMobile();
  const [leftUrl, setLeftUrl] = useState("https://9x.9mm.pro/");
  const [rightUrl, setRightUrl] = useState("https://app.piteas.io/");
  const [selectedChain, setSelectedChain] = useState<string>("PLS");
  const [availableWebsites, setAvailableWebsites] = useState<Website[]>(chainWebsites["PLS"]);

  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    if (chainWebsites[chain] && chainWebsites[chain].length > 0) {
      const firstWebsite = chainWebsites[chain][0].url;
      const secondWebsite = chainWebsites[chain].length > 1 ? chainWebsites[chain][1].url : firstWebsite;
      setLeftUrl(firstWebsite);
      setRightUrl(secondWebsite);
      setAvailableWebsites(chainWebsites[chain]);
    }
  };

  const handleUrlChange = (url: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftUrl(url);
    } else {
      setRightUrl(url);
    }
  };

  const getWebsiteName = (url: string) => {
    const website = availableWebsites.find(w => w.url === url);
    return website?.name || url;
  };

  const OpenInNewTabButton = ({ url }: { url: string }) => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <Button
        onClick={() => window.open(url, '_blank')}
        className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-4 text-lg flex items-center gap-3"
      >
        <ExternalLink className="h-5 w-5" />
        Open {url} in new tab
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Toolbar */}
      <div className="w-full bg-gray-800 border-b border-orange-500 p-2">
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row gap-4'} items-center justify-between`}>
          {/* Left Panel Controls */}
          <div className="flex-1 flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600 justify-between">
                  <span className="truncate">{getWebsiteName(leftUrl)}</span>
                  <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 min-w-[200px]">
                {availableWebsites.map((website, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleUrlChange(website.url, 'left')}
                    className="text-white hover:bg-gray-700 cursor-pointer"
                  >
                    {website.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Chain Selector - Center */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="min-w-[200px] bg-orange-600 border-orange-500 text-white hover:bg-orange-500">
                  {selectedChain || "Select Chain"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600">
                {chainsData.chains.map((chain) => (
                  <DropdownMenuItem
                    key={chain.id}
                    onClick={() => handleChainChange(chain.name)}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600 justify-between">
                  <span className="truncate">{getWebsiteName(rightUrl)}</span>
                  <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 min-w-[200px]">
                {availableWebsites.map((website, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleUrlChange(website.url, 'right')}
                    className="text-white hover:bg-gray-700 cursor-pointer"
                  >
                    {website.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`w-full h-[calc(100vh-80px)] flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 p-2`}>
        <div className="flex-1 bg-gray-900 border border-orange-500 rounded-lg shadow-sm overflow-hidden transition-all duration-300">
          {isEmbeddable(leftUrl) ? (
            <iframe
              src={leftUrl}
              className="w-full h-full border-0"
              title="Left webpage"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <OpenInNewTabButton url={leftUrl} />
          )}
        </div>
        <div className="flex-1 bg-gray-900 border border-orange-500 rounded-lg shadow-sm overflow-hidden transition-all duration-300">
          {isEmbeddable(rightUrl) ? (
            <iframe
              src={rightUrl}
              className="w-full h-full border-0"
              title="Right webpage"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <OpenInNewTabButton url={rightUrl} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
