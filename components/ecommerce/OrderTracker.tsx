import React from "react";
import { OrderStatus } from "@/types";
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPin,
  Check,
  XCircle,
} from "lucide-react";

interface OrderTrackerProps {
  status: OrderStatus;
}

const STEPS: { status: OrderStatus; label: string; description: string; icon: React.ElementType }[] = [
  {
    status: "PENDING",
    label: "Order Placed",
    description: "Received & awaiting approval",
    icon: Clock,
  },
  {
    status: "CONFIRMED",
    label: "Confirmed",
    description: "Verified by merchant",
    icon: CheckCircle2,
  },
  {
    status: "PROCESSING",
    label: "Processing",
    description: "Packaging & QA check",
    icon: Package,
  },
  {
    status: "SHIPPED",
    label: "Shipped",
    description: "In transit with carrier",
    icon: Truck,
  },
  {
    status: "OUT_FOR_DELIVERY",
    label: "Out for Delivery",
    description: "With local courier",
    icon: MapPin,
  },
  {
    status: "DELIVERED",
    label: "Delivered",
    description: "Package received",
    icon: Check,
  },
];

export function OrderTracker({ status }: OrderTrackerProps) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6 dark:border-rose-900/60 dark:bg-rose-950/30 flex items-start gap-4">
        <XCircle className="h-6 w-6 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
            Order Has Been Cancelled
          </h4>
          <p className="mt-1 text-xs text-rose-700 dark:text-rose-300">
            This order was cancelled. If you were billed, your refund will be processed back to the original method or payment will not be collected on delivery.
          </p>
        </div>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.status === status);
  // Default to 0 if not found
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
        Fulfillment & Delivery Progress
      </h3>

      {/* Progress Bar / Steps Grid */}
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 z-0">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${(activeIndex / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.status}
                className="flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-2"
              >
                {/* Step Circle */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all flex-shrink-0 ${
                    isCompleted
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : isCurrent
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950/80 shadow-md"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Step Labels */}
                <div>
                  <p
                    className={`text-xs font-bold ${
                      isCurrent
                        ? "text-indigo-600 dark:text-indigo-400"
                        : isCompleted
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
