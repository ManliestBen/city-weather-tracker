import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as weatherAPI from '../../services/api-calls';

class CityListPage extends Component {
    state = {
        cities: [],
    }

    async componentDidMount() {
        const cities = await weatherAPI.getCities();
        this.setState({cities})
    }

    render() {
        return(
            <>  
                {this.state.cities.map((city) => 
                    <div key={city._id}>
                    <Link
                        to={{
                            pathname: `/city/${city._id}`,
                            state: {city}
                        }}
                    >{city.name}
                    </Link><br></br>
                    </div>
                )}
            </>
        )
    }
}

export default CityListPage;