var fs = require('fs');

var fileContents = fs.readFileSync('all.json','utf8');
var schema = JSON.parse(fileContents);

var all = [];


for(st in schema.types) {
  t = schema.types[st]
  all.push('/**');
  all.push(' * @class ' + t.id);
  for (st in t.supertypes) {
    all.push(' * @extends ' +t.supertypes[st] );
  }
  all.push(' * ' + t.comment);
  all.push(' * ');
  all.push(' * URL: [' + t.url+ '](' + t.url + ')');
  all.push(' */');
  all.push(t.id +' = function () {');

  l = t.specific_properties.length
  for(i in t.specific_properties) {
    sp =  t.specific_properties[i];
    all.push('/**');
    c = schema.properties[sp];
    all.push(' * @property  {' + c.ranges.join('/') + '} '+ sp );
    all.push(' * ' + c.comment  );
  
    all.push(' * ');
    all.push(' */');
  }

  all.push('}');
}


all = all.join('\n');
fs.writeFileSync('all.js',all, 'utf8');

