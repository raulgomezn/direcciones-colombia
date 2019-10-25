var module = require('../index.js');

describe('direcciones-colombia/index.js', function () {
    it('index.js: All functions and services exported are defined', function () {
        expect(module).toBeDefined();
        expect(module.standardizeAddress).toBeDefined();
    });
    it('index.js: standardizeAddress success', function () {
        try {
            var initial = 'Carrera 17 No 93 - 82 Oficina 306';
            var finalResponse = 'CR 17 93 82 OF 306';
            
            var response = module.standardizeAddress(initial);
            expect(response).toBeDefined();
            expect(response).toBe(finalResponse);
        } catch (err) {
            console.log(err);
            fail();
        }
    });
    it('index.js: standardizeAddress success', function () {
        try {
            var initial = 'Super manzana 12 casa 東久留米市 (Higashikurume)';
            var finalResponse = 'SM 12 CA HIGASHIKURUME';
            
            var response = module.standardizeAddress(initial);
            expect(response).toBeDefined();
            expect(response).toBe(finalResponse);
        } catch (err) {
            console.log(err);
            fail();
        }
    });

    it('index.js: standardizeAddress success', function () {
        try {
            var initial = 'carrera 129B # 139A-79 apto 1305 to 1';
            var finalResponse = 'CR 129 B 139 A 79 AP 1305 TO 1';
            
            var response = module.standardizeAddress(initial);
            expect(response).toBeDefined();
            expect(response).toBe(finalResponse);
        } catch (err) {
            console.log(err);
            fail();
        }
    });
});