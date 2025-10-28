import React from 'react';
import Head from 'next/head';
import { Navigation } from '@/presentation/components/Navigation';
import TestApiSection from '@/presentation/components/TestApiSection';

const TestApiPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Test API - Posts</title>
        <meta name="description" content="Test API page" />
      </Head>

      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-24">
          <TestApiSection />
        </main>
      </div>
    </>
  );
};

export default TestApiPage;
