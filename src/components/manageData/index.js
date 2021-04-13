import React from 'react';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const CardText = ({ data, dataName }) => (
  <Card.Text>
    <span>{`${dataName}: `}</span>
    {data}
  </Card.Text>
);

const InformationsLine = ({ data, dataName }) => (
  <li>
    <span>{`${dataName}: `}</span>
    {data === null ? 'Aucune information' : data}
  </li>
);

CardText.defaultProps = {
  data: null,
  dataName: null,
};

CardText.propTypes = {
  data: propTypes.string,
  dataName: propTypes.string,
};

InformationsLine.defaultProps = {
  data: null,
  dataName: null,
};

InformationsLine.propTypes = {
  data: propTypes.string,
  dataName: propTypes.string,
};

export { CardText, InformationsLine };
