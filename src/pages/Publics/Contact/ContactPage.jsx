import React from 'react';
import ContactHero from '@pages/Publics/Contact/ContactHero';
import SupportOptions from '@pages/Publics/Contact/SupportOptions';
import ContactForm from '@pages/Publics/Contact/ContactForm';

const ContactPage = () => {
  return (
    <>
      <ContactHero />
      <SupportOptions />
      <ContactForm />
    </>
  );
};

export default ContactPage;
