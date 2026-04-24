import React from 'react';
import LegalLayout from './LegalLayout';

const TermsAndConditions = () => {
  return (
    <LegalLayout title="Terms and Conditions">
      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Service Agreement</h2>
        <p>
          By booking a session with The Cool Kids Studio, you agree to the following terms and conditions. 
          Our services include professional photography, image editing, and delivery of final digital or physical products.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Booking & Payment</h2>
        <p>
          A non-refundable retainer fee is required to secure your booking date. 
          The remaining balance must be paid in full on or before the day of the photo session.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Copyright & Usage</h2>
        <p>
          The Cool Kids Studio retains the copyright to all images. Clients are granted a personal use license, 
          allowing them to print and share images for non-commercial purposes. 
          Commercial use or resale of images is strictly prohibited without written consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Rescheduling</h2>
        <p>
          We understand that life happens. Please notify us at least 48 hours in advance if you need to reschedule. 
          One rescheduling is permitted per booking, subject to availability.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading text-primary uppercase mb-4">Delivery</h2>
        <p>
          Final edited images are typically delivered within 2-4 weeks of the session date via a private online gallery. 
          Turnaround times may vary during peak seasons.
        </p>
      </section>
    </LegalLayout>
  );
};

export default TermsAndConditions;
