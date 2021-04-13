import React from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    const {
      theme,
      facetState,
      valueState,
    } = this.props;
    this.state = {
      theme,
      facetState,
      valueState,
      selectedValue: null,
      values: [],
    };
  }

  getValues(e) {
    const codePostal = [];
    switch (e.target.value) {
      case 'pmr':
      case 'blind':
      case 'deaf':
        this.setState({
          values: [
            { value: 1, label: 'Oui' },
            { value: 0, label: 'Non' },
          ],
        });
        break;
      case 'address_zipcode':
        for (let i = 0; i <= 20; i += 1) {
          const departement = i >= 10 ? `750${i}` : `7500${i}`;
          codePostal.push({ value: departement, label: departement });
        }
        this.setState({
          values: codePostal,
        });
        break;
      case 'access_type':
        this.setState({
          values: [
            { value: 'reservation', label: 'reservation' },
            { value: 'libre', label: 'libre' },
          ],
        });
        break;
      case 'price_type':
        this.setState({
          values: [
            { value: 'gratuit', label: 'gratuit' },
            { value: 'payant', label: 'payant' },
          ],
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      theme,
      facetState,
      valueState,
      selectedValue,
      values,
    } = this.state;
    return (
      <Form.Group>
        <Form.Control
          as="select"
          defaultValue="default"
          onChange={(e) => {
            this.setState({ selectedValue: e.target.value });
            this.getValues(e);
            facetState(e);
          }}
        >
          <option value="default" disabled>{theme}</option>
          <option value="category">category</option>
          <option value="tags">tags</option>
          <option value="address_name">Adresse</option>
          <option value="address_zipcode">Code postal</option>
          <option value="pmr">Personne à mobilité réduites</option>
          <option value="blind">Personnes aveugles</option>
          <option value="deaf">Personnes sourdes</option>
          <option value="access_type">Type d&apos;accès</option>
          <option value="price_type">Entrée</option>
        </Form.Control>
        {selectedValue === 'address_name' || selectedValue === 'tags' || selectedValue === 'category'
          ? <Form.Control onChange={valueState} />
          : (
            <Form.Control as="select" defaultValue="default" onChange={valueState}>
              <option value="default" disabled>ayant pour valeur ...</option>
              {values.map((value) => (
                <option value={value.value}>{value.label}</option>
              ))}
            </Form.Control>
          )}
      </Form.Group>
    );
  }
}

List.defaultProps = {
  theme: null,
  facetState: () => {},
  valueState: () => {},
};

List.propTypes = {
  theme: propTypes.string,
  facetState: propTypes.func,
  valueState: propTypes.func,
};
