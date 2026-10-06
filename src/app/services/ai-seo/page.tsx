"use client";

import React from 'react';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { SERVICES_CONFIG } from '../../../data/servicesData';

export default function AiSeoPage() {
  const config = SERVICES_CONFIG['ai-seo'];
  return <ServicePageTemplate config={config} />;
}
