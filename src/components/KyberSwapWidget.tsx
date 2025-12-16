import { Widget } from "@kyberswap/widgets";

interface KyberSwapWidgetProps {
  className?: string;
}

const KyberSwapWidget = ({ className }: KyberSwapWidgetProps) => {
  const theme = {
    primary: "#f97316",
    secondary: "#1f2937",
    dialog: "#111827",
    borderRadius: "16px",
    buttonRadius: "8px",
    stroke: "#374151",
    interactive: "#374151",
    accent: "#f97316",
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
    text: "#ffffff",
    subText: "#9ca3af",
    fontFamily: "inherit",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className={className}>
      <Widget
        client="lovable-swap-app"
        theme={theme}
        tokenList={[]}
        enableRoute={true}
        enableDexes="kyberswap-elastic,uniswapv3,uniswap"
        title={<div className="text-white font-bold">KyberSwap</div>}
        chainId={1}
        connectedAccount={{ address: undefined, chainId: 1 }}
        onSubmitTx={async () => ""}
      />
    </div>
  );
};

export default KyberSwapWidget;
