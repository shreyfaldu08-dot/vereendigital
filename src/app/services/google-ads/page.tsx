"use client";

import React from 'react';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { SERVICES_CONFIG } from '../../../data/servicesData';

export default function GoogleAdsPage() {
  const config = SERVICES_CONFIG['google-ads'];
  return <ServicePageTemplate config={config} />;
}
