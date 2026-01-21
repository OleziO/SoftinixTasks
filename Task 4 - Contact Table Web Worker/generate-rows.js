// Script to generate 200 additional rows (51-250)

const firstNames = ['Alexander', 'Benjamin', 'Charlotte', 'Diana', 'Ethan', 'Fiona', 'Gabriel', 'Hannah', 'Isaac', 'Julia', 'Kevin', 'Laura', 'Mason', 'Natalie', 'Oliver', 'Patricia', 'Quentin', 'Rebecca', 'Samuel', 'Teresa', 'Ulysses', 'Victoria', 'William', 'Xavier', 'Yvonne', 'Zachary', 'Adrian', 'Bella', 'Carlos', 'Daniela', 'Edward', 'Francesca', 'George', 'Helena', 'Ivan', 'Jasmine', 'Kyle', 'Lindsey', 'Marcus', 'Nina', 'Oscar', 'Penelope', 'Quinn', 'Rosa', 'Simon', 'Tara', 'Uriel', 'Valerie', 'Wade', 'Xena'];

const lastNames = ['Anderson', 'Barnes', 'Cohen', 'Dixon', 'Ellis', 'Foster', 'Grant', 'Hughes', 'Irwin', 'Jensen', 'Kelly', 'Lopez', 'Murray', 'Nash', 'Ortiz', 'Powell', 'Quinn', 'Reed', 'Stone', 'Turner', 'Underwood', 'Vega', 'Walsh', 'Xavier', 'Young', 'Zhang', 'Abbott', 'Bishop', 'Cross', 'Duncan', 'Evans', 'Fletcher', 'Gray', 'Harrison', 'Ingram', 'Jordan', 'Knight', 'Lane', 'Morgan', 'Norton', 'Oliver', 'Peters', 'Quinn', 'Ross', 'Shaw', 'Todd', 'Upton', 'Vaughn', 'Webb', 'York'];

const domains = ['techsolutions.com', 'innovatehub.io', 'digitalpro.net', 'cloudservices.dev', 'webstudio.com', 'datatech.io', 'nexgen.net', 'smartsys.com', 'cybercore.dev', 'techwave.io', 'prodigital.com', 'netflow.io', 'codestream.dev', 'infotech.net', 'biztech.com'];

const companies = ['TechFlow', 'DataCore', 'WebPro', 'CloudBase', 'NetSphere', 'CodeWorks', 'InfoTech', 'DigitalEdge', 'SmartSys', 'CyberNet', 'ProWeb', 'StreamLine', 'TechBridge', 'DataWave', 'NetPulse'];

const companySuffixes = ['Inc.', 'LLC', 'Corp', 'Solutions', 'Technologies', 'Group', 'Systems', 'Enterprises', 'Services', 'Digital'];

const streets = ['Washington St', 'Jefferson Ave', 'Lincoln Blvd', 'Madison Dr', 'Monroe Way', 'Jackson Ct', 'Adams Rd', 'Kennedy Ln', 'Roosevelt Pl', 'Wilson St', 'Grant Ave', 'Hayes Dr', 'Garfield Way', 'Arthur Ln', 'Cleveland Rd'];

const cities = ['Portland', 'Seattle', 'Denver', 'Austin', 'Boston', 'Phoenix', 'Dallas', 'Miami', 'Atlanta', 'Chicago', 'San Francisco', 'Los Angeles', 'New York', 'Las Vegas', 'Orlando', 'Houston', 'Philadelphia', 'San Diego', 'Charlotte', 'Nashville', 'Minneapolis', 'Tampa', 'Cleveland', 'Detroit', 'Columbus', 'Indianapolis', 'Baltimore', 'Memphis', 'Louisville', 'Milwaukee', 'Albuquerque', 'Tucson', 'Kansas City', 'Omaha', 'Raleigh', 'Virginia Beach', 'Oakland', 'Sacramento', 'Riverside', 'Lexington', 'Stockton', 'Pittsburgh', 'Cincinnati', 'Toledo', 'Buffalo', 'Newark', 'Jersey City', 'Anaheim', 'St. Louis', 'Corpus Christi'];

const states = ['OR', 'WA', 'CO', 'TX', 'MA', 'AZ', 'FL', 'GA', 'IL', 'CA', 'NY', 'NV', 'TN', 'MN', 'OH', 'IN', 'MD', 'KY', 'WI', 'NM', 'MO', 'NE', 'NC', 'VA', 'PA'];

let output = '';

for (let i = 51; i <= 250; i++) {
  const firstName = firstNames[(i - 51) % firstNames.length];
  const lastName = lastNames[Math.floor((i - 51) / 4) % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[(i - 51) % domains.length]}`;
  const phone = `555${String(Math.floor(1000000 + (i * 12345) % 9000000)).substring(0, 7)}`;
  const website = `https://${domains[(i - 51) % domains.length]}`;
  const company = `${companies[(i - 51) % companies.length]} ${companySuffixes[(i - 51) % companySuffixes.length]}`;
  const streetNum = 100 + ((i - 51) * 37) % 900;
  const street = streets[(i - 51) % streets.length];
  const city = cities[(i - 51) % cities.length];
  const state = states[(i - 51) % states.length];
  const address = `${streetNum} ${street}, ${city}, ${state}`;

  output += `  ,{\n`;
  output += `    id: '${i}',\n`;
  output += `    cells: [\n`;
  output += `      { colId: 'email', value: '${email}' },\n`;
  output += `      { colId: 'name', value: '${name}' },\n`;
  output += `      { colId: 'phone', value: '${phone}' },\n`;
  output += `      { colId: 'website', value: '${website}' },\n`;
  output += `      { colId: 'company', value: '${company}' },\n`;
  output += `      { colId: 'address', value: '${address}' },\n`;
  output += `      { colId: 'city', value: '${city}' }\n`;
  output += `    ]\n`;
  output += `  }\n`;
}

console.log(output);

