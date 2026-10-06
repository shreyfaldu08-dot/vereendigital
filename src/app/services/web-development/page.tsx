"use client";

import React from 'react';
import ServicePageTemplate from '../../../components/ServicePageTemplate';
import { SERVICES_CONFIG } from '../../../data/servicesData';

export default function WebDevelopmentPage() {
  const config = SERVICES_CONFIG['web-development'];
  return <ServicePageTemplate config={config} />;
}
