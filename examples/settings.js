
let stateIds =
      [
        { value: 1, label: 'AK' },
        { value: 30, label: 'NY' },
        { value: 2, label: 'AZ' },
        { value: 31, label: 'NC' },
        { value: 3, label: 'AR' },
        { value: 32, label: 'ND' },
        { value: 4, label: 'CA' },
        { value: 33, label: 'OH' },
        { value: 5, label: 'CO' },
        { value: 34, label: 'OK' },
        { value: 6, label: 'CT' },
        { value: 35, label: 'OR' },
        { value: 7, label: 'DE' },
        { value: 36, label: 'PA' },
        { value: 8, label: 'FL' },
        { value: 7, label: 'RI' },
        { value: 9, label: 'GA' },
        { value: 38, label: 'SC' },
        { value: 10, label: 'ID' },
        { value: 39, label: 'SD' },
        { value: 11, label: 'IL' },
        { value: 40, label: 'TN' },
        { value: 12, label: 'IA' },
        { value: 41, label: 'TX' },
        { value: 13, label: 'IA' },
        { value: 42, label: 'UT' },
        { value: 14, label: 'KS' },
        { value: 43, label: 'VT' },
        { value: 15, label: 'KT' },
        { value: 44, label: 'VA' },
        { value: 16, label: 'LA' },
        { value: 45, label: 'WA' },
        { value: 17, label: 'ME' },
        { value: 46, label: 'WV' },
        { value: 18, label: 'MD' },
        { value: 47, label: 'WI' },
        { value: 19, label: 'MA' },
        { value: 48, label: 'WY' },
        { value: 20, label: 'MI' },
        { value: 21, label: 'MN' },
        { value: 22, label: 'MI' },
        { value: 103, label: 'Central Region' },
        { value: 23, label: 'MO' },
        { value: 24, label: 'MT' },
        { value: 25, label: 'NE' },
        { value: 106, label: 'South Region' },
        { value: 26, label: 'NV' },
        { value: 27, label: 'NH' },
        { value: 28, label: 'NJ' },
        { value: 29, label: 'NM' },
        { value: 50, label: 'USA?'}
    ];
export var settings = {
  title: 'React-Dash v0.5.x -- Climate Indices by Year',
  queries: {},
  doFilterRouting: false,
  dataResources: {
    climateData: {
      fetchData: {
        type: 'backend',
        backend: 'csv',
        url: 'https://dl.dropboxusercontent.com/u/73703010/react_dash_data_0.4/climate_indices.csv'
      },
    }
  },

  regions: [
    {
      id: 'top-row filters-row',
      className: 'row',
      children: [
        {
          type: 'Autocomplete',
          className: 'col-md-6',
          name: 'specialty-autocomplete',
          id: 'specialty-autocomplete',
          className: 'specialty-autocomplete',
          field: 'YearMonth',
          action: 'filter', // sort / groupBy / etc
          willFilter: ['climateData'], // array of dkanDataResources keys that filters affect 
          data: [
            [
              { label: '2010', value: '2010' },
              { label: '2011', value: '2011' },
              { label: '2012', value: '2012' },
              { label: '2013', value: '2013' },
              { label: '2014', value: '2014' },
              { label: '2015', value: '2015' },
            ]
          ],
          placeholder: 'Select year to filter dashboard...'
        }
      ]
    },
    {
      id: 'metrics-row',
      className: 'row',
      children: [
        {
          type: 'Metric',
          cardStyle: 'metric',
          iconClass: 'fa fa-level-up',
          className: 'col-md-4',
          background: "#00b3b3",
          caption: 'Maximum Temp.',
          dataHandlers: [
            {
              name: 'getClimateMetric',
              field: 'TMAX'
            },
          ]
        },
        {
          type: 'Metric',
          cardStyle: 'metric',
          iconClass: 'fa fa-level-down',
          className: 'col-md-4',
          background: '#009999',
          caption: 'Minimum Temp.',
          dataHandlers: [
            {
              name: 'getClimateMetric',
              field: 'TMIN'
            }
          ]
        },
        {
          type: 'Metric',
          cardStyle: 'metric',     
          iconClass: 'fa fa-fire',
          className: 'col-md-4',
          caption: 'Average Temp/',
          background: '#004d4d',
          dataHandlers: [
            {
              name: 'getClimateMetric',
              field: 'TAVG'
            }
          ]
        }
      ]
    },
    {
      id: 'map-row',
      className: 'row',
      children: [
        // choropleth
        {
          type: 'Choropleth',
          cardStyle: 'map',
          iconClass: 'fa fa-balance-scale',
          header: 'Palmer Hydrological Drought Index',
          format: 'topojson',
          dataHandlers: [
            {
              name: 'getMapData',
              stateArray: stateIds
            }
          ],
          dataKeyField: 'name',
          dataValueField: 'PHDI',
          geometryKeyField: 'name',
          geometry: 'https://dl.dropboxusercontent.com/u/73703010/react_dash_data_0.4/map/usa.json', // topojson or geojson
          projection: 'albersUsa', // https://github.com/d3/d3/wiki/Geo-Projections
          scaleDenominator: .75,
          borderColor: 'yellow',
          noDataColor: 'yellow',
          topologyObject: 'usa',
          startColor: '#e6ffff',
          endColor: '#004d4d',
          dataClassification: 'equidistant',
          legend: {
            classesCount: 5,
            pallete:
							[
								"#e6ffff",
								"#00ffff",
								"#00cccc",
								"#00b3b3",
								"#009999",
								"#008080",
								"#004d4d"
							]
          },
        },
      ]
    },
    {
      id: 'text-row',
      className: 'row',
      children: [          
        {
          type: 'Markup',
          content: '<p>Hydrological drought is described as a sustained and regionally extensive occurrence of below average natural water availability (Tallaksen and van Lanen, 2004). Hydrological drought as period of time below the average water content in streams, reservoirs, groundwater aquifers, lakes and soils. The period is associated effects of precipitation (including snowfall) shortfall on surface and subsurface water supply, rather than with direct shortfall in precipitation (Yevjevich et al., 1977). Hydrological drought may be the result of long term meteorological droughts that results in the drying up of reservoirs, lakes, streams, rivers and a decline in groundwater levels (Rathore 2004).</p>'
        }
      ]
    },


    {
      id: 'chart-row',
      className: 'row',
      children: [
        {
          type: 'Chart',
          cardStyle: 'chart',
          header: 'Standard Precipitation Index',
          iconClass: 'fa fa-cloud',
          dataHandlers: [
            {
              name: 'getBarChartData'
            },
          ],
          settings: {
            type: 'multiBarChart',
            x: 'x',
            y: 'y',
            height: 800
          }
        },
      ]
    },
    /*{
      type: 'Region',
      className: 'region-piesI row',
      children: [
        {
          type: 'Chart',
          cardStyle: 'chart',
          header: 'Chart 1',
          style: {borderRight: '1px dotted gray'},
          className: 'col-md-6',
          data: [[{x: 1, y: 40}, {x: 2, y: 40}, {x: 3, y: 20}]],
          dataHandlers: ['NVD3.toPieChartSeries'],
          settings: {
            type: 'pieChart',
            x: 'x',
            y: 'y',
            height: 400
          },
        },
        {
          type: 'Chart',
          cardStyle: 'chart',
          header: 'Chart 2',
          className: 'col-md-6',
          data: [[{x: 1, y: 40}, {x: 2, y: 40}, {x: 3, y: 20}]],
          dataHandlers: ['NVD3.toPieChartSeries'],
          settings: {
            type: 'pieChart',
            x: 'x',
            y: 'y',
            height: 400
          },
        }, 
      ]
    }, */

   {
      id: 'footer',
      className: 'row',
      children: [
        {
          type: 'Markup',
          content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>'
        }     
      ]
    }
  ],
}


let climateVars = {
			PCP: 'Precipitation Index',
			TAVG: 'Temperature Index',
			TMIN: 'Minimum Temperature Index',
			TMAX: 'Maximum Temperature Index',
			PDSI: 'Palmer Drought Severity Index',
			PHDI: 'Palmer Hydrological Drought Index',
			ZNDX: 'Palmer Z-Index',
			PMDI: 'Modified Palmer Drought Severity Index',
			CDD: 'Cooling Degree Days',
			HDD: 'Heating Degree Days',
			SPnn: 'Standard Precipitation Index'
		};
