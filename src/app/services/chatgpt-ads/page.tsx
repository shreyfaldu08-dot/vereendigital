"use client";

import React from 'react';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { SERVICES_CONFIG } from '../../../data/servicesData';

export default function ChatGptAdsPage() {
  const config = SERVICES_CONFIG['chatgpt-ads'];
  return <ServicePageTemplate config={config} />;
}
