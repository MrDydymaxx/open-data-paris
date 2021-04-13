import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardText } from '../manageData';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    const {
      message,
      data,
    } = this.props;
    if (data) {
      return (
        <div className="body">
          <h1>{message}</h1>
          <Row>
            {data.records.map(({ fields, recordid }) => (
              <Col xs={4}>
                <Card className="cards">
                  <Card.Body>
                    <Card.Title className="card-title">{fields.title}</Card.Title>
                    <CardText data={fields.category} dataName="Catégorie" />
                    <CardText data={fields.address_name} dataName="Établissement" />
                    <CardText data={`${fields.address_street} ${fields.address_zipcode}`} dataName="Adresse" />
                    <CardText data={fields.blind === 1 ? 'Oui' : 'Non'} dataName="Adapté aux personnes aveugles" />
                    <CardText data={fields.deaf === 1 ? 'Oui' : 'Non'} dataName="Adapté aux personnes malentendantes" />
                    <CardText data={fields.pmr === 1 ? 'Oui' : 'Non'} dataName="Adapté aux personnes à mobilité réduite" />
                    <CardText data={fields.contact_phone} dataName="Téléphone" />
                    <Link to={`/${recordid}`} className="text-decoration-none">
                      <Button variant="outline-light">Plus d&apos;information</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
    return (
      <div className="body">
        <h1>Bienvenue dans l&apos;annuaire des évènements de Paris !</h1>
        <p>Choisissez une recherche par élément ou par critères.</p>
      </div>
    );
  }
}

Body.defaultProps = {
  message: null,
  data: null,
};

Body.propTypes = {
  message: propTypes.string,
  data: propTypes.shape({
    records: propTypes.arrayOf(propTypes.shape({
      datasetid: propTypes.string,
      recordid: propTypes.string,
      fields: propTypes.shape({
        category: propTypes.string,
        title: propTypes.string,
        access_type: propTypes.string,
        address_name: propTypes.string,
        address_street: propTypes.string,
        address_zipcode: propTypes.string,
        contact_mail: propTypes.string,
        contact_phone: propTypes.string,
        price_type: propTypes.string,
      }),
      geometry: propTypes.shape({
        coordinates: propTypes.arrayOf(propTypes.number),
      }),
    })),
  }),
};

export default Body;
