import React from 'react';
import LegalLayout from './LegalLayout';

const RefundPolicy = () => {
  return (
    <LegalLayout title="Refund Policy">
      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Retainer Fees</h2>
        <p>
          Retainer fees paid to secure your booking date are non-refundable. 
          This fee covers initial consultations and holds your spot in our schedule, 
          preventing us from taking other clients for that time.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Cancellations</h2>
        <p>
          In the event of a cancellation, the retainer fee is forfeited. 
          If you have paid for your session in full, any amount beyond the retainer 
          may be eligible for a refund if cancelled at least 7 days before the session.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Digital Products</h2>
        <p>
          Due to the nature of digital products, once a private gallery has been delivered 
          and images have been downloaded, no refunds will be issued. 
          We strive for complete satisfaction and will work with you to make minor edits if needed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Physical Prints</h2>
        <p>
          Refunds for physical products (prints, albums) are only available if the product 
          is arrived damaged or has manufacturing defects. Please contact us within 48 hours 
          of receiving your product to initiate a replacement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Studio Credit</h2>
        <p>
          In certain circumstances, at the discretion of management, studio credit 
          may be offered instead of a monetary refund. Studio credit can be used 
          for future sessions or products.
        </p>
      </section>
    </LegalLayout>
  );
};

export default RefundPolicy;
