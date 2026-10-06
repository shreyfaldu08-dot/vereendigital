"use client";

import React from 'react';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { SERVICES_CONFIG } from '../../../data/servicesData';

export default function MetaAdsPage() {
  const config = SERVICES_CONFIG['meta-ads'];
  return <ServicePageTemplate config={config} />;
}
