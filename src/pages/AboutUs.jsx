import React from 'react';

const AboutUs = () => {
  const branches = [
    { location: 'Downtown', address: '123 Main St, City, Country', phone: '+123 456 7890', openingHours: 'Mon-Sat: 10am-10pm, Sun: 12pm-8pm' },
    { location: 'Uptown', address: '456 Oak Ave, City, Country', phone: '+123 456 7890', openingHours: 'Mon-Sat: 10am-10pm, Sun: 12pm-8pm' },
    { location: 'Westside', address: '789 Elm St, City, Country', phone: '+123 456 7890', openingHours: 'Mon-Sat: 10am-10pm, Sun: 12pm-8pm' },
    // Add more branches as needed
  ];

  const headOffice = { location: 'Main Office', address: '789 Oak St, City, Country', phone: '+123 456 7890', openingHours: 'Mon-Fri: 9am-5pm' };

  const servingDuration = 'Serving delicious meals since 20XX';
  const distinctiveTaste = 'Experience our unique blend of flavors that will tantalize your taste buds.';

  return (
    <div className="branches-page-container p-4 md:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Our Branches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branches */}
        <div className="branch-list">
          <h3 className="text-xl font-semibold mb-4">Branches</h3>
          {branches.map((branch, index) => (
            <div key={index} className="mb-6 rounded-lg shadow-lg bg-white">
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{branch.location}</h4>
                <p className="text-sm mb-2">{branch.address}</p>
                <p className="text-sm mb-2">Phone: {branch.phone}</p>
                <p className="text-sm mb-2">Opening Hours: {branch.openingHours}</p>
                <p className="text-sm">{servingDuration}</p>
                <p className="text-sm">{distinctiveTaste}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Head Office */}
        <div className="head-office">
          <h3 className="text-xl font-semibold mb-4">Head Office</h3>
          <div className="rounded-lg shadow-lg bg-white">
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">{headOffice.location}</h4>
              <p className="text-sm mb-2">{headOffice.address}</p>
              <p className="text-sm mb-2">Phone: {headOffice.phone}</p>
              <p className="text-sm mb-2">Opening Hours: {headOffice.openingHours}</p>
              <p className="text-sm">{servingDuration}</p>
              <p className="text-sm">{distinctiveTaste}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
