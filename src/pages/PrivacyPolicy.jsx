import React from 'react';
import LegalLayout from './LegalLayout';

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Introduction</h2>
        <p>
          At The Cool Kids Studio, we value your privacy and are committed to protecting your personal data. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you visit 
          our studio or use our website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, such as when you book a session, 
          subscribe to our newsletter, or contact us for inquiries. This may include:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Name, email address, and phone number</li>
          <li>Billing and payment information</li>
          <li>Details about your family or event for photography purposes</li>
          <li>Images captured during our photography sessions</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">How We Use Your Data</h2>
        <p>
          Your data is used to provide our services, process payments, and communicate with you. 
          With your explicit consent, we may also use your photographs in our portfolio, 
          social media, or marketing materials to showcase our work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Security</h2>
        <p>
          We implement industry-standard security measures to ensure the safety of your personal 
          information and your private galleries. We do not sell or trade your data to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. 
          If you wish to withdraw consent for the use of your images in our portfolio, 
          please contact us directly.
        </p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
