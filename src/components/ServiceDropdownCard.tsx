"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { SERVICES_LIST } from '../data/servicesData';

interface ServiceDropdownCardProps {
  onSelect?: () => void;
  className?: string;
}

export const ServiceDropdownCard: React.FC<ServiceDropdownCardProps> = ({ onSelect, className = '' }) => {
  const pathname = usePathname();

  return (
    <div
      className={`w-[235px] bg-[#fdfdfc] text-[#1c1d1a] rounded-[22px] p-2.5 shadow-[0_22px_55px_rgba(0,0,0,0.28)] border border-black/[0.08] select-none ${className}`}
      style={{
        boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="flex flex-col gap-0.5">
        {SERVICES_LIST.map((service) => {
          const isActive = pathname === service.href;

          return (
            <a
              key={service.slug}
              href={service.href}
              onClick={onSelect}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-[#eef5e0] text-[#3f5d13] font-bold'
                  : 'text-[#2a2c26] hover:bg-black/[0.04] hover:text-black font-medium'
                }`}
            >
              <span className="text-[14.5px] tracking-tight">{service.name}</span>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-[#698c25] flex-shrink-0" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceDropdownCard;
