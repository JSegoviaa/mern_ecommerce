import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Keycaps',
  description: 'Los mejores keycaps del país',
  keywords: 'Keycaps para teclados mecánicos',
};

export default Meta;
