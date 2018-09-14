const update = require('../abrahamJest/adres')

test('Variable should = what was input', () => {
    expect(update('street', '1600 Pennsilvania  av')).toBe('1600 Pennsilvania  av');
    expect(update('city', 'Washington DC')).toBe('Washington DC')
    expect(update('state', 'DC')).toBe('DC')
});