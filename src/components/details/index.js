import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Container,
  Navbar,
  Nav,
  Image,
} from 'react-bootstrap';
import Axios from 'axios';
import { Notyf } from 'notyf';
import GoogleMap from 'google-map-react';
import { InformationsLine } from '../manageData';

const Marker = () => (
  <div dangerouslySetInnerHTML={{
    __html: `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="97.713px" height="97.713px" viewBox="0 0 97.713 97.713" style="enable-background:new 0 0 97.713 97.713;"
    xml:space="preserve">
<g>
  <path d="M48.855,0C29.021,0,12.883,16.138,12.883,35.974c0,5.174,1.059,10.114,3.146,14.684
    c8.994,19.681,26.238,40.46,31.31,46.359c0.38,0.441,0.934,0.695,1.517,0.695s1.137-0.254,1.517-0.695
    c5.07-5.898,22.314-26.676,31.311-46.359c2.088-4.57,3.146-9.51,3.146-14.684C84.828,16.138,68.69,0,48.855,0z M48.855,54.659
    c-10.303,0-18.686-8.383-18.686-18.686c0-10.304,8.383-18.687,18.686-18.687s18.686,8.383,18.686,18.687
    C67.542,46.276,59.159,54.659,48.855,54.659z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`,
  }}
  />
);

class Details extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      id: match.params.id,
      data: null,
    };
  }

  componentDidMount() {
    this.getDescription();
  }

  async getDescription() {
    const { id } = this.state;
    const { history } = this.props;
    try {
      const { data } = await Axios.get(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`);
      this.setState({
        data: data.record.fields,
      });
    } catch (err) {
      new Notyf().error('Id incorrect');
      history.push('/');
    }
  }

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <Container fluid id="container">
          <Navbar className="navbar" fluid>
            <Navbar.Brand>{data.title}</Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Retour vers recherche</Nav.Link>
            </Nav>
          </Navbar>
          <div style={{ padding: '2%' }}>
            <Image src={data.cover_url} alt={data.cover_alt} className="image" />
            <p>{data.lead_text}</p>
            <h2>Description</h2>
            <p dangerouslySetInnerHTML={{ __html: data.description }} />
            <h2>Informations</h2>
            <ul>
              <InformationsLine dataName="Catégorie" data={data.category} />
              <InformationsLine dataName="Nom de l'établissement" data={data.address_name} />
              <InformationsLine dataName="Type d'entrée" data={data.price_type} />
              <InformationsLine dataName="Adresse" data={`${data.address_street === null ? '' : data.address_street} ${data.address_zipcode === null ? '' : data.address_zipcode} ${data.address_city === null ? '' : data.address_city}`} />
              <InformationsLine dataName="Programe" data={data.programs} />
              <InformationsLine dataName="Adapté aux personnes à mobilité réduite" data={data.pmr === 1 ? 'Oui' : 'Non'} />
              <InformationsLine dataName="Adapté aux personnes sourdes" data={data.deaf === 1 ? 'Oui' : 'Non'} />
              <InformationsLine dataName="Adapté aux personnes aveugles" data={data.blind === 1 ? 'Oui' : 'Non'} />
              <InformationsLine dataName="Mots clés" data={data.tags !== null ? data.tags.join(', ') : 'aucun'} />
            </ul>
            <h2>Dates</h2>
            <p dangerouslySetInnerHTML={{ __html: data.date_description }} />
            <h2>Détail des prix</h2>
            <p dangerouslySetInnerHTML={{ __html: data.price_detail }} />
            <h2>Contacts</h2>
            <ul>
              <InformationsLine dataName="Facebook" data={data.contact_facebook} />
              <InformationsLine dataName="Twitter" data={data.contact_twitter} />
              <InformationsLine dataName="Mail" data={data.contact_mail} />
              <InformationsLine dataName="Phone" data={data.contact_phone} />
              <InformationsLine dataName="Site web" data={data.contact_url} />
            </ul>
            <div className="map">
              <h2>Map</h2>
              <GoogleMap
                bootstrapURLKeys="AIzaSyD4Ta5T7yWIe9eBSfZBvwRc3UWWcoe85js"
                defaultCenter={{ lat: data.lat_lon.lat, lng: data.lat_lon.lon }}
                defaultZoom={11}
              >
                <Marker
                  lat={data.lat_lon.lat}
                  lng={data.lat_lon.lon}
                />
              </GoogleMap>
            </div>
          </div>
        </Container>
      );
    }
    return <Container id="container" fluid>Loading...</Container>;
  }
}

Details.defaultProps = {
  match: null,
  history: () => {},
};

Details.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
  history: propTypes.func,
};

export default Details;
