
import { useCluster } from "@/components/cluster/cluster-data-access"
import toast, { Toaster } from "react-hot-toast"


export function ExplorerLink({
  path,
  label,
  className,
}: {
  path: string
  label: string
  className?: string
}) {
  const { getExplorerUrl } = useCluster()
  return (
    <a
      // href={getExplorerUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono`}
    >
      Address: {label}
    </a>
  )
}


export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={"text-center"}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={"View Transaction"}
          className="btn btn-xs btn-primary"
        />
      </div>
    )
  }
}
