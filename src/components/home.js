import React, {useState, useEffect} from 'react';
import axios from 'axios';

import MatTable from './MatTable';

function Home(props) {

    const [states, setStates] = useState([]);
    ///const [timeseries, setTimeseries] = useState([]);
    const [lastUpdated, setLastUpdated] = useState('');
    const [stateTestData, setStateTestData] = useState({});
    const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
    const [activityLog, setActivityLog] = useState([]);

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        response,
        stateDistrictWiseResponse,
        updateLogResponse,
        stateTestResponse,
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/updatelog/log.json'),
        axios.get('https://api.covid19india.org/state_test_data.json'),
      ]);
      setStates(response.data.statewise);
      ///setTimeseries(validateCTS(response.data.cases_time_series));
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setStateTestData(stateTestResponse.data.states_tested_data.reverse());
      setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setActivityLog(updateLogResponse.data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };





  return (
    <React.Fragment>
      <div className="Home">
              <h1>COVID-19 Tracker</h1>

               <MatTable
                         stateDistrictWiseData={stateDistrictWiseData}
                         />
      </div>
    </React.Fragment>
  );
}

export default Home;
