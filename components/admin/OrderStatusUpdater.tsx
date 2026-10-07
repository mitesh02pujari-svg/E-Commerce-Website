"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus, PaymentStatus } from "@/types";
import { updateOrderStatusAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/Button";
import { Loader2, Check } from "lucide-react";

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: OrderStatus;
  currentPaymentStatus: PaymentStatus;
}

const ALL_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const ALL_PAYMENT_STATUSES: PaymentStatus[] = ["PENDING", "PAID", "FAILED"];

export function OrderStatusUpdater({
  orderId,
  currentStatus,
  currentPaymentStatus,
}: OrderStatusUpdaterProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(currentPaymentStatus);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);

    try {
      const res = await updateOrderStatusAction(orderId, status, paymentStatus);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        router.refresh();
      } else {
        setErrorMsg(res.error || "Failed to update status");
      }
    } catch {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
    >
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Update Fulfillment & Payment Status
      </h3>

      {errorMsg && (
        <div className="rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Fulfillment Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {ALL_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Payment Status
          </label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {ALL_PAYMENT_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        {success ? (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
            <Check className="h-4 w-4" />
            <span>Updated successfully!</span>
          </span>
        ) : (
          <span />
        )}

        <Button type="submit" disabled={loading} size="sm">
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            "Save Status Update"
          )}
        </Button>
      </div>
    </form>
  );
}
