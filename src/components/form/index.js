import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import propTypes from 'prop-types';
import { Notyf } from 'notyf';
import List from './list';

class Formulaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: '',
      rows: undefined,
      q: '',
      // Search multi-criteria
      lang: '',
      tri: {
        by: null,
        selectedOption: 'croissant',
      },
      include: {
        facet: '',
        value: null,
      },
      exclude: {
        facet: '',
        value: null,
      },
      geofilterDistance: null,
      geofilterPolygon: null,
      timeZone: '',
      // Response
      message: undefined,
      data: undefined,
    };
  }

  async getDatas() {
    const {
      nav,
      q,
      rows,
      lang,
      tri,
      include,
      exclude,
      geofilterDistance,
      geofilterPolygon,
      timeZone,
    } = this.state;
    const rowsForRequest = rows && rows > 0 ? rows : 30;
    const triForRequest = tri.by !== null ? `&sort=${tri.selectedOption === 'croissant' ? '' : '-'}${tri.by}` : '';
    const includeForRequest = include.facet !== '' && include.value !== null ? `&refine.${include.facet}=${include.value}` : '';
    const excludeForRequest = exclude.facet !== '' && exclude.value !== null ? `&exclude.${exclude.facet}=${exclude.value}` : '';
    const langForRequest = lang.length === 2 ? `&lang=${lang}` : '';
    const geofilterDistanceForRequest = geofilterDistance !== null ? `&geofilter.distance=${geofilterDistance}` : '';
    const geofilterPolygonForRequest = geofilterPolygon !== null ? `&geofilter.polygon=${geofilterPolygon}` : '';
    const timeZoneForRequest = timeZone !== '' ? `&timezone=${timeZone}` : '';
    if (nav === 'query') {
      try {
        if (q === '') throw new Error('Empty query');
        const { data } = await Axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&q=${q}&rows=${rowsForRequest}`);
        this.setState({ message: `${data.nhits} Resultat${data.nhits > 1 ? 's' : ''}`, data });
        new Notyf().success('Requete effectué avec succès');
      } catch (err) {
        this.setState({ message: err.message, data: [] });
        new Notyf().error('Echec de la requete');
      }
    }
    if (nav === 'multi') {
      try {
        const { data } = await Axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&rows=${rowsForRequest + triForRequest + includeForRequest + excludeForRequest + langForRequest + timeZoneForRequest + geofilterDistanceForRequest + geofilterPolygonForRequest}`);
        this.setState({ message: `${data.nhits} Resultat${data.nhits > 1 ? 's' : ''}`, data });
        new Notyf().success('Requete effectué avec succès');
      } catch (err) {
        this.setState({ message: err.message, data: [] });
        new Notyf().error('Echec de la requete');
      }
    }
  }

  async searchQuery(e) {
    e.preventDefault();
    const { datas } = this.props;
    await this.getDatas();
    const {
      message,
      data,
    } = this.state;
    this.setState({
      nav: '',
      rows: undefined,
      q: '',
      lang: '',
      tri: {
        by: null,
        selectedOption: 'croissant',
      },
      include: {
        facet: '',
        value: null,
      },
      exclude: {
        facet: '',
        value: null,
      },
      geofilterDistance: null,
      geofilterPolygon: null,
      timeZone: '',
    });
    datas(message, data);
  }

  render() {
    const {
      q,
      nav,
      rows,
      tri,
      timeZone,
    } = this.state;
    if (nav === 'query') {
      return (
        <Form className="openDataForm" onSubmit={(e) => this.searchQuery(e)}>
          <Form.Control placeholder="query" onChange={(e) => this.setState({ q: e.target.value })} value={q} />
          <Form.Control placeholder="Max cards (default: 30)" onChange={(e) => this.setState({ rows: Number(e.target.value) })} value={rows} type="number" />
          <Button variant="outline-dark" type="submit" className="submit">Submit</Button>
          <Button variant="outline-dark" onClick={() => this.setState({ nav: '' })}>Back</Button>
        </Form>
      );
    }
    if (nav === 'multi') {
      return (
        <Form className="openDataForm-choice" onSubmit={(e) => this.searchQuery(e)}>
          <Form.Group>
            <Form.Control placeholder="Code langue" maxLength={2} onChange={(e) => this.setState({ lang: e.target.value })} />
            <Form.Text>Contient 2 lettres</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              defaultValue="default"
              onChange={(e) => this.setState({
                tri: {
                  by: e.target.value,
                  selectedOption: tri.selectedOption,
                },
              })}
            >
              <option value="default" disabled>Trié par ...</option>
              <option value="tags">Tags</option>
              <option value="address_name">Adresse</option>
              <option value="address_zipcode">Code postal</option>
              <option value="address_city">Ville</option>
            </Form.Control>
            <Form.Check
              type="radio"
              value="croissant"
              name="tri"
              label="Croissant"
              checked={tri.selectedOption === 'croissant'}
              onChange={(e) => this.setState({
                tri: {
                  by: tri.by,
                  selectedOption: e.target.value,
                },
              })}
            />
            <Form.Check
              type="radio"
              value="decroissant"
              name="tri"
              label="Décroissant"
              checked={tri.selectedOption === 'decroissant'}
              onChange={(e) => this.setState({
                tri: {
                  by: tri.by,
                  selectedOption: e.target.value,
                },
              })}
            />
          </Form.Group>
          <List
            theme="Uniquement ..."
            facetState={(e) => {
              const { include } = this.state;
              this.setState({
                include: {
                  facet: e.target.value,
                  value: include.value,
                },
              });
            }}
            valueState={(e) => {
              const { include } = this.state;
              this.setState({
                include: {
                  facet: include.facet,
                  value: e.target.value,
                },
              });
            }}
          />
          <List
            theme="En excluant ..."
            facetState={(e) => {
              const { exclude } = this.state;
              this.setState({
                exclude: {
                  facet: e.target.value,
                  value: exclude.value,
                },
              });
            }}
            valueState={(e) => {
              const { exclude } = this.state;
              this.setState({
                exclude: {
                  facet: exclude.facet,
                  value: e.target.value,
                },
              });
            }}
          />
          <Form.Group>
            <Form.Control placeholder="Rayon de recherche" onChange={(e) => this.setState({ geofilterDistance: e.target.value })} />
            <Form.Text>En format: latitude, longitude, distance</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="Polygone de recherche" onChange={(e) => this.setState({ geofilterPolygon: e.target.value })} />
            <Form.Text>En format (lat1, long1), (lat2, lon2), (lat3, lon3)</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="timezone" value={timeZone} onChange={(e) => this.setState({ timeZone: e.target.value })} />
            <Form.Text>Exemple: Europe/Berlin</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="Max cards (default: 30)" type="number" />
          </Form.Group>
          <Button variant="outline-dark" type="submit" className="submit">Submit</Button>
          <Button variant="outline-dark" onClick={() => this.setState({ nav: '' })}>Back</Button>
        </Form>
      );
    }
    return (
      <div className="openDataForm">
        <Button variant="outline-dark" onClick={() => this.setState({ nav: 'query' })}>Recherche par query</Button>
        <span>ou</span>
        <Button variant="outline-dark" onClick={() => this.setState({ nav: 'multi' })}>Recherche multi-critère</Button>
      </div>
    );
  }
}

Formulaire.defaultProps = {
  datas: () => {},
};

Formulaire.propTypes = {
  datas: propTypes.func,
};

export default Formulaire;
