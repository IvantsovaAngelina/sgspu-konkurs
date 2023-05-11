import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Organization = () => {
  const [organization, setOrganization] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/organization/findAll')
      .then(res => {
        const organization = res.data;
        setOrganization(organization);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <select className='selectOrg' name="organizationId">
      {organization.map((org) => (
        <option className='optionOrg' key={org.id} value={org.id}>
          {org.name}
        </option>
      ))}
    </select>
  );
};

export default Organization;