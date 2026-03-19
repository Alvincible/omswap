import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, SplitSquareHorizontal } from "lucide-react";
import chainsData from "@/data/Chains.json";
import referencesData from "@/data/References.json";

// Import all chain website data
import xchData from "@/data/XCH.json";
import ethData from "@/data/ETH.json";
import baseData from "@/data/BASE.json";
import bscData from "@/data/BSC.json";
import plsData from "@/data/PLS.json";
import sData from "@/data/S.json";
import adaData from "@/data/ADA.json";
import croData from "@/data/CRO.json";

// Import chain logos
import xchLogo from "@/assets/chains/xch.png";
import ethLogo from "@/assets/chains/eth.png";
import baseLogo from "@/assets/chains/base.png";
import bscLogo from "@/assets/chains/bsc.png";
import plsLogo from "@/assets/chains/pls.png";
import sLogo from "@/assets/chains/s.png";
import adaLogo from "@/assets/chains/ada.png";
import croLogo from "@/assets/chains/cro.png";

const chainLogos: Record<string, string> = {
  XCH: xchLogo,
  ETH: ethLogo,
  BASE: baseLogo,
  BSC: bscLogo,
  PLS: plsLogo,
  S: sLogo,
  ADA: adaLogo,
  CRO: croLogo,
};

interface Website {
  url: string;
  name: string;
  iFrame: boolean;
}

interface Chain {
  id: string;
  name: string;
  color: string;
}

interface Reference {
  id: string;
  url: string;
  name: string;
  iFrame: boolean;
}

// Create lookup maps for references
const websiteMap = new Map<string, Reference>();
const bridgeMap = new Map<string, Reference>();

referencesData.websites.forEach((ref) => {
  websiteMap.set(ref.id, ref);
});

referencesData.bridges.forEach((ref) => {
  bridgeMap.set(ref.id, ref);
});

// Helper function to resolve IDs to Website objects
const resolveWebsiteIds = (ids: string[]): Website[] => {
  return ids
    .map((id) => websiteMap.get(id))
    .filter((ref): ref is Reference => ref !== undefined)
    .map((ref) => ({ url: ref.url, name: ref.name, iFrame: ref.iFrame }));
};

const resolveBridgeIds = (ids: string[]): Website[] => {
  return ids
    .map((id) => bridgeMap.get(id))
    .filter((ref): ref is Reference => ref !== undefined)
    .map((ref) => ({ url: ref.url, name: ref.name, iFrame: ref.iFrame }));
};

const chainWebsites: Record<string, Website[]> = {
  XCH: resolveWebsiteIds(xchData.websites),
  ETH: resolveWebsiteIds(ethData.websites),
  BASE: resolveWebsiteIds(baseData.websites),
  BSC: resolveWebsiteIds(bscData.websites),
  PLS: resolveWebsiteIds(plsData.websites),
  S: resolveWebsiteIds(sData.websites),
  ADA: resolveWebsiteIds(adaData.websites),
  CRO: resolveWebsiteIds(croData.websites),
};

const chainBridges: Record<string, Website[]> = {
  XCH: resolveBridgeIds(xchData.bridges || []),
  ETH: resolveBridgeIds(ethData.bridges || []),
  BASE: resolveBridgeIds(baseData.bridges || []),
  BSC: resolveBridgeIds(bscData.bridges || []),
  PLS: resolveBridgeIds(plsData.bridges || []),
  S: resolveBridgeIds(sData.bridges || []),
  ADA: resolveBridgeIds(adaData.bridges || []),
};

// Create a chain lookup map for O(1) access
const chainMap = new Map<string, Chain>();
(chainsData.chains as Chain[]).forEach((chain) => {
  chainMap.set(chain.name, chain);
});

// Color classes for each chain theme
const chainColorClasses: Record<string, { border: string; bg: string; hover: string; text: string }> = {
  green: { border: "border-green-500", bg: "bg-green-600", hover: "hover:bg-green-500", text: "text-black" },
  slate: { border: "border-slate-400", bg: "bg-slate-500", hover: "hover:bg-slate-400", text: "text-black" },
  blue: { border: "border-blue-500", bg: "bg-blue-600", hover: "hover:bg-blue-500", text: "text-black" },
  yellow: { border: "border-yellow-500", bg: "bg-yellow-500", hover: "hover:bg-yellow-400", text: "text-black" },
  purple: { border: "border-purple-500", bg: "bg-purple-600", hover: "hover:bg-purple-500", text: "text-black" },
  orange: { border: "border-orange-500", bg: "bg-orange-500", hover: "hover:bg-orange-400", text: "text-black" },
  cardano: { border: "border-blue-600", bg: "bg-blue-700", hover: "hover:bg-blue-600", text: "text-white" },
};

const Index = () => {
  const isMobile = useIsMobile();
  const [leftUrl, setLeftUrl] = useState("https://dexie.space/swap");
  const [rightUrl, setRightUrl] = useState("https://v2.tibetswap.io/");
  const [selectedChain, setSelectedChain] = useState<string>("XCH");
  const [selectedColor, setSelectedColor] = useState<string>("green");
  const [availableWebsites, setAvailableWebsites] = useState<Website[]>(chainWebsites["XCH"]);
  const [availableBridges, setAvailableBridges] = useState<Website[]>(chainBridges["XCH"]);

  // Create URL-to-Website maps for O(1) lookups
  const websiteUrlMap = useMemo(() => {
    const map = new Map<string, Website>();
    availableWebsites.forEach((website) => {
      map.set(website.url, website);
    });
    return map;
  }, [availableWebsites]);

  const bridgeUrlMap = useMemo(() => {
    const map = new Map<string, Website>();
    availableBridges.forEach((bridge) => {
      map.set(bridge.url, bridge);
    });
    return map;
  }, [availableBridges]);

  // Memoize embeddable checks
  const leftEmbeddable = useMemo(() => {
    const website = websiteUrlMap.get(leftUrl);
    if (website) return website.iFrame;
    const bridge = bridgeUrlMap.get(leftUrl);
    if (bridge) return bridge.iFrame;
    return true;
  }, [leftUrl, websiteUrlMap, bridgeUrlMap]);

  const rightEmbeddable = useMemo(() => {
    const website = websiteUrlMap.get(rightUrl);
    if (website) return website.iFrame;
    const bridge = bridgeUrlMap.get(rightUrl);
    if (bridge) return bridge.iFrame;
    return true;
  }, [rightUrl, websiteUrlMap, bridgeUrlMap]);

  // Get current color classes based on selected chain
  const colors = chainColorClasses[selectedColor] || chainColorClasses.green;

  const handleChainChange = useCallback((chain: string) => {
    setSelectedChain(chain);
    // Use Map for O(1) lookup instead of array.find()
    const chainData = chainMap.get(chain);
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
  }, []);

  const handleUrlChange = useCallback((url: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftUrl(url);
    } else {
      setRightUrl(url);
    }
  }, []);

  const getWebsiteName = useCallback((url: string) => {
    const website = websiteUrlMap.get(url);
    if (website) return website.name;
    const bridge = bridgeUrlMap.get(url);
    if (bridge) return bridge.name;
    return url;
  }, [websiteUrlMap, bridgeUrlMap]);

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
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Toolbar */}
      <div className={`w-full bg-gray-900 border-b ${colors.border} p-2`}>
        <div className="flex flex-row gap-1 md:gap-4 items-center justify-between">
          {/* Left Panel Controls */}
          <div className="flex-1 flex items-center gap-1 md:gap-2 min-w-0 order-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className={`w-full bg-gray-700 ${colors.border} text-white hover:bg-gray-600 justify-between min-w-0 px-2 md:px-3`}>
                  <span className="truncate text-xs md:text-sm max-w-[60px] md:max-w-none">
                    {getWebsiteName(leftUrl)}
                  </span>
                  <span className="hidden md:inline text-blue-400 ml-1 truncate">({leftUrl})</span>
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 min-w-[200px] md:min-w-[300px] p-1 z-50 max-h-[60vh] overflow-y-auto">
                <div className="px-2 py-1 text-xs text-gray-400 font-semibold">Dexes & Aggregators</div>
                {availableWebsites.map((website, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <button
                      onClick={() => handleUrlChange(website.url, 'left')}
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm truncate"
                    >
                      {website.name}
                    </button>
                    <button
                      onClick={() => window.open(website.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm flex-shrink-0"
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
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm truncate"
                    >
                      {bridge.name}
                    </button>
                    <button
                      onClick={() => window.open(bridge.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Chain Selector - Center */}
          <div className="flex items-center justify-center order-2 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className={`min-w-fit ${colors.bg} ${colors.border} ${colors.text} ${colors.hover} text-sm md:text-lg py-1 px-2 md:px-3 whitespace-nowrap`}>
                  {selectedChain && chainLogos[selectedChain] && (
                    <img src={chainLogos[selectedChain]} alt={selectedChain} className="h-5 w-5 md:h-6 md:w-6 mr-1 md:mr-2" />
                  )}
                  <span>{selectedChain || "Select Chain"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 z-50">
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
          <div className="flex-1 flex items-center gap-1 md:gap-2 min-w-0 order-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className={`w-full bg-gray-700 ${colors.border} text-white hover:bg-gray-600 justify-between min-w-0 px-2 md:px-3`}>
                  <span className="truncate text-xs md:text-sm max-w-[60px] md:max-w-none">
                    {getWebsiteName(rightUrl)}
                  </span>
                  <span className="hidden md:inline text-blue-400 ml-1 truncate">({rightUrl})</span>
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 min-w-[200px] md:min-w-[300px] p-1 z-50 max-h-[60vh] overflow-y-auto">
                <div className="px-2 py-1 text-xs text-gray-400 font-semibold">Dexes & Aggregators</div>
                {availableWebsites.map((website, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <button
                      onClick={() => handleUrlChange(website.url, 'right')}
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm truncate"
                    >
                      {website.name}
                    </button>
                    <button
                      onClick={() => window.open(website.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="my-1 border-t border-gray-600" />
                <div className="px-2 py-1 text-xs text-gray-400 font-semibold">Bridges & Cross-Chain Swaps</div>
                {availableBridges.map((bridge, index) => (
                  <div key={`bridge-${index}`} className="flex items-center gap-1">
                    <button
                      onClick={() => handleUrlChange(bridge.url, 'right')}
                      className="flex-1 text-left text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded text-sm truncate"
                    >
                      {bridge.name}
                    </button>
                    <button
                      onClick={() => window.open(bridge.url, '_blank')}
                      className="text-white hover:bg-gray-700 cursor-pointer px-2 py-1.5 rounded flex items-center gap-1 text-sm flex-shrink-0"
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
      <div className={`w-full ${isMobile ? 'h-[calc(100vh-52px)]' : 'h-[calc(100vh-60px)]'} flex ${isMobile ? 'flex-col' : 'flex-row'} gap-1 md:gap-2 p-1 md:p-2`}>
        <div className={`${isMobile ? 'h-1/2' : 'flex-1'} bg-gray-900 border ${colors.border} rounded-lg shadow-sm overflow-hidden transition-all duration-300`}>
          {leftEmbeddable ? (
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
        <div className={`${isMobile ? 'h-1/2' : 'flex-1'} bg-gray-900 border ${colors.border} rounded-lg shadow-sm overflow-hidden transition-all duration-300`}>
          {rightEmbeddable ? (
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
