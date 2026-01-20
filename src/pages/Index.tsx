import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, SplitSquareHorizontal } from "lucide-react";
import chainsData from "@/data/Chains.json";

// Import all chain website data
import xchData from "@/data/XCH.json";
import ethData from "@/data/ETH.json";
import baseData from "@/data/BASE.json";
import bscData from "@/data/BSC.json";
import plsData from "@/data/PLS.json";
import sData from "@/data/S.json";

// Import chain logos
import xchLogo from "@/assets/chains/xch.png";
import ethLogo from "@/assets/chains/eth.png";
import baseLogo from "@/assets/chains/base.png";
import bscLogo from "@/assets/chains/bsc.png";
import plsLogo from "@/assets/chains/pls.png";
import sLogo from "@/assets/chains/s.png";

const chainLogos: Record<string, string> = {
  XCH: xchLogo,
  ETH: ethLogo,
  BASE: baseLogo,
  BSC: bscLogo,
  PLS: plsLogo,
  S: sLogo,
};

interface Website {
  url: string;
  name: string;
}

interface Chain {
  id: string;
  name: string;
  color: string;
}

const chainWebsites: Record<string, Website[]> = {
  XCH: xchData.websites,
  ETH: ethData.websites,
  BASE: baseData.websites,
  BSC: bscData.websites,
  PLS: plsData.websites,
  S: sData.websites,
};

// Placeholder bridges for all chains
const chainBridges: Record<string, Website[]> = {
  XCH: [
    { url: "https://bridge-a.example.com", name: "Bridge A" },
    { url: "https://bridge-b.example.com", name: "Bridge B" },
    { url: "https://bridge-c.example.com", name: "Bridge C" },
  ],
  ETH: [
    { url: "https://bridge-a.example.com", name: "Bridge A" },
    { url: "https://bridge-b.example.com", name: "Bridge B" },
    { url: "https://bridge-c.example.com", name: "Bridge C" },
  ],
  BASE: [
    { url: "https://bridge-a.example.com", name: "Bridge A" },
    { url: "https://bridge-b.example.com", name: "Bridge B" },
    { url: "https://bridge-c.example.com", name: "Bridge C" },
  ],
  BSC: [
    { url: "https://bridge-a.example.com", name: "Bridge A" },
    { url: "https://bridge-b.example.com", name: "Bridge B" },
    { url: "https://bridge-c.example.com", name: "Bridge C" },
  ],
  PLS: [
    { url: "https://bridge-a.example.com", name: "Bridge A" },
    { url: "https://bridge-b.example.com", name: "Bridge B" },
    { url: "https://bridge-c.example.com", name: "Bridge C" },
  ],
  S: [
    { url: "https://bridge-a.example.com", name: "Bridge A" },
    { url: "https://bridge-b.example.com", name: "Bridge B" },
    { url: "https://bridge-c.example.com", name: "Bridge C" },
  ],
};

// Color classes for each chain theme
const chainColorClasses: Record<string, { border: string; bg: string; hover: string; text: string }> = {
  green: { border: "border-green-500", bg: "bg-green-600", hover: "hover:bg-green-500", text: "text-black" },
  slate: { border: "border-slate-400", bg: "bg-slate-500", hover: "hover:bg-slate-400", text: "text-black" },
  blue: { border: "border-blue-500", bg: "bg-blue-600", hover: "hover:bg-blue-500", text: "text-black" },
  yellow: { border: "border-yellow-500", bg: "bg-yellow-500", hover: "hover:bg-yellow-400", text: "text-black" },
  purple: { border: "border-purple-500", bg: "bg-purple-600", hover: "hover:bg-purple-500", text: "text-black" },
  orange: { border: "border-orange-500", bg: "bg-orange-500", hover: "hover:bg-orange-400", text: "text-black" },
};

// Sites that block iframe embedding
const nonEmbeddableSites = ["kyberswap.com", "matcha.xyz", "dex.9mm.pro"];

const isEmbeddable = (url: string) => {
  return !nonEmbeddableSites.some(site => url.includes(site));
};

const Index = () => {
  const isMobile = useIsMobile();
  const [leftUrl, setLeftUrl] = useState("https://dexie.space/swap");
  const [rightUrl, setRightUrl] = useState("https://v2.tibetswap.io/");
  const [selectedChain, setSelectedChain] = useState<string>("XCH");
  const [selectedColor, setSelectedColor] = useState<string>("green");
  const [availableWebsites, setAvailableWebsites] = useState<Website[]>(chainWebsites["XCH"]);
  const [availableBridges, setAvailableBridges] = useState<Website[]>(chainBridges["XCH"]);

  // Get current color classes based on selected chain
  const colors = chainColorClasses[selectedColor] || chainColorClasses.green;

  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    // Find the chain data to get the color
    const chainData = (chainsData.chains as Chain[]).find(c => c.name === chain);
    if (chainData) {
      setSelectedColor(chainData.color);
    }
    if (chainWebsites[chain] && chainWebsites[chain].length > 0) {
      const firstWebsite = chainWebsites[chain][0].url;
      const secondWebsite = chainWebsites[chain].length > 1 ? chainWebsites[chain][1].url : firstWebsite;
      setLeftUrl(firstWebsite);
      setRightUrl(secondWebsite);
      setAvailableWebsites(chainWebsites[chain]);
      setAvailableBridges(chainBridges[chain] || []);
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

  const OpenInNewTabButton = ({ url, name }: { url: string; name: string }) => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-900">
      <div
        className="bg-gray-400 text-white px-3 py-2 text-sm flex items-center gap-2 cursor-not-allowed select-none rounded"
      >
        {name} does not support iFrame
      </div>
      <Button
        onClick={() => window.open(url, '_blank')}
        className={`${colors.bg} ${colors.hover} ${colors.text} px-8 py-6 text-xl flex items-center gap-3`}
      >
        <ExternalLink className="h-6 w-6" />
        Open {name} in new tab
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Toolbar */}
      <div className={`w-full bg-gray-900 border-b ${colors.border} p-2`}>
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row gap-4'} items-center justify-between`}>
          {/* Left Panel Controls */}
          <div className="flex-1 flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className={`flex-1 bg-gray-700 ${colors.border} text-white hover:bg-gray-600 justify-between`}>
                  <span className="truncate">{getWebsiteName(leftUrl)}   (<span className="text-blue-400">{leftUrl}</span>)</span>
                  <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 min-w-[300px] p-1">
                <div className="px-2 py-1 text-xs text-gray-400 font-semibold">DEXes</div>
                {availableWebsites.map((website, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <button
                      onClick={() => handleUrlChange(website.url, 'left')}
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm"
                    >
                      {website.name}
                    </button>
                    <button
                      onClick={() => window.open(website.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="my-1 border-t border-gray-600" />
                <div className="px-2 py-1 text-xs text-gray-400 font-semibold">Bridges</div>
                {availableBridges.map((bridge, index) => (
                  <div key={`bridge-${index}`} className="flex items-center gap-1">
                    <button
                      onClick={() => handleUrlChange(bridge.url, 'left')}
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm"
                    >
                      {bridge.name}
                    </button>
                    <button
                      onClick={() => window.open(bridge.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Chain Selector - Center */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className={`min-w-[200px] ${colors.bg} ${colors.border} ${colors.text} ${colors.hover} text-lg py-1`}>
                  {selectedChain && chainLogos[selectedChain] && (
                    <img src={chainLogos[selectedChain]} alt={selectedChain} className="h-6 w-6 mr-2" />
                  )}
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
                    {chainLogos[chain.name] && (
                      <img src={chainLogos[chain.name]} alt={chain.name} className="h-4 w-4 mr-2" />
                    )}
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
                <Button size="sm" variant="outline" className={`flex-1 bg-gray-700 ${colors.border} text-white hover:bg-gray-600 justify-between`}>
                  <span className="truncate">{getWebsiteName(rightUrl)}   (<span className="text-blue-400">{rightUrl}</span>)</span>
                  <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 min-w-[300px] p-1">
                <div className="px-2 py-1 text-xs text-gray-400 font-semibold">DEXes</div>
                {availableWebsites.map((website, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <button
                      onClick={() => handleUrlChange(website.url, 'right')}
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm"
                    >
                      {website.name}
                    </button>
                    <button
                      onClick={() => window.open(website.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="my-1 border-t border-gray-600" />
                <div className="px-2 py-1 text-xs text-gray-400 font-semibold">Bridges</div>
                {availableBridges.map((bridge, index) => (
                  <div key={`bridge-${index}`} className="flex items-center gap-1">
                    <button
                      onClick={() => handleUrlChange(bridge.url, 'right')}
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm"
                    >
                      {bridge.name}
                    </button>
                    <button
                      onClick={() => window.open(bridge.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`w-full h-[calc(100vh-80px)] flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 p-2`}>
        <div className={`flex-1 bg-gray-900 border ${colors.border} rounded-lg shadow-sm overflow-hidden transition-all duration-300`}>
          {isEmbeddable(leftUrl) ? (
            <iframe
              src={leftUrl}
              className="w-full h-full border-0"
              title="Left webpage"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <OpenInNewTabButton url={leftUrl} name={getWebsiteName(leftUrl)} />
          )}
        </div>
        <div className={`flex-1 bg-gray-900 border ${colors.border} rounded-lg shadow-sm overflow-hidden transition-all duration-300`}>
          {isEmbeddable(rightUrl) ? (
            <iframe
              src={rightUrl}
              className="w-full h-full border-0"
              title="Right webpage"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <OpenInNewTabButton url={rightUrl} name={getWebsiteName(rightUrl)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
