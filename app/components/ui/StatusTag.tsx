import { StatusTag } from "../../types/coffee";

interface StatusTagProps {
  status: StatusTag;
}

export default function StatusTagComponent({ status }: StatusTagProps) {
  const statusConfig = {
    "fresh-drop": {
      label: "Fresh Drop",
      className: "bg-green-100 text-green-900 border-green-300",
    },
    "low-inventory": {
      label: "Low Inventory",
      className: "bg-orange-100 text-orange-900 border-orange-300",
    },
    "roasting-tuesday": {
      label: "Roasting Tuesday",
      className: "bg-blue-100 text-blue-900 border-blue-300",
    },
    "in-stock": {
      label: "In Stock",
      className: "bg-slate-100 text-slate-900 border-slate-300",
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`px-4 py-2 text-sm font-mono-bold uppercase border ${config.className}`}>
      {config.label}
    </span>
  );
}

