import React from 'react';

const Section = ({ title, children, ...rest }) => (
  <section className="bg-white shadow-lg p-5 rounded-md" {...rest}>
    <h2 className="text-3xl mb-4">{title}</h2>
    <section className="border border-2 border-gray-400 p-3">
      {children}
    </section>
  </section>
);

export default Section;
