import React from 'react';

import AppComponent from 'flow-app-component';

import './css/theme/default.css';

class DropdownComponent extends AppComponent {
  constructor() {
    super();
    const newState = {
        interactiveMode: false,
        readOnly: false,
        dropDownContent: [],
        properties: [
        {
          categoryName: 'General',
          categoryDescription: 'Basic settings for the dropdown',
          properties: [],
        },
        {
          categoryName: 'Events',
          categoryDescription: 'Events for the dropdown',
          properties: [
            {
              id: 'event',
              name: 'Events',
              type: 'graph',
              options: {},
              data: null,
            },
          ],
        },
      ],
      iconUrl: '/assets/images/dropdown-component.png',
      name: 'Dropdown',
      type: 'ui-component',
      componentType: 'dropdown',
      category: 'Inputs',
      parent: null,
      showOnComponentsPanel: true,
      isValuable: true,
      allowsChildren: false,
    };

    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
  }
  
  componentDidMount(){
    const dropDownContent = this.getPropertyData('dropdown') || [
        'Random',
        'Dropdown',
        'Data',
    ];
    const interactiveMode = !(this.props.propertyData.interactiveMode === undefined);
    this.setState({ dropDownContent, readOnly: interactiveMode });
  }

  triggerGraphEvent = () => {
    const graphId = this.getPropertyData('event');
    this.getElementProps().onEvent(graphId)
  }

  renderContent() {
    const  { dropDownContent, readOnly } = this.state;
    return (
      <div
        className="dropdown-container">
        <label className="dropdown-label" htmlFor="dropdown">
          Dropdown
        </label>
        <div className="dropdown-inner-container">
          <div 
            className="dropdown-card"
            onMouseOver={this.triggerGraphEvent}
          >
            <select
                id="dropdown"
                name="dropdownValue"
                className="dropdown-select"
                disabled={readOnly}
            >
              {dropDownContent.map((datum, id) => (
                <option key={id} value={datum}>
                  {datum}
                </option>
              ))}
            </select>
          </div>
          <span className="dropdown-icon">
            <svg
              viewBox="0 0 18 18"
              role="presentation"
              aria-hidden="true"
              focusable="false"
              style={{
                height: '16px',
                width: '16px',
                display: 'block',
                fill: '#484848',
              }}
            >
              <path
                d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z"
                fillRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  }
}

export default DropdownComponent;
