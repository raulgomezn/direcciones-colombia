/**
 * @module direcciones-colombia
 * @description Homologar uan dirección Colombiana colocada por un usuario a un estandar manejado por la Dian.
 * @author      raulgomezn
 * @version     1.0.0                 
 * @since       2019-10-24
 * @lastModified 2019-10-25
 * 
 * var module = require('direcciones-colombia');
 * test:
 * node -e "console.log(require('./index').standardizeAddress('Super manzana 12 casa'))"
 * => SM 12 CA
*/
module.exports = {
    standardizeAddress
};

function standardizeAddress(address) {

    if (Object.entries(address).length === 0 && address.constructor === Object || address === '') {
        return '';
    }

    var textInitial = replaceCharacters(normalize(String(address).toUpperCase().trim()));
    var listWords = [];
    var words = textInitial.split(' ');
    var i;
    var text = '';
    var positive = 0;
    var exist;

    for (i = 0; i <= words.length; i++) {
        var lastExist = exist;
        //console.log("0 " + words[i]);
        //console.log("0.1 " + (ultimoExist !== undefined ? (ultimoExist.abbreviation + "-" + ultimoExist.description) : ''));

        if (positive == 0) {
            text = (text + ' ' + words[i]).trim();
            //console.log("1 " + text);
            exist = map.find(x => x.description === (text));
            //--
            if (!exist) {
                var temp;
                if ((i + 1) <= (words.length - 1)) {
                    temp = (text + ' ' + words[i + 1]).trim();
                    var existTemp = map.find(x => x.description === (temp));
                    if (existTemp) {
                        exist = existTemp;
                    }
                }
            }
        }
        else {
            text = (text + ' ' + words[i]).trim();
            //console.log("2 " + text);
            exist = map.find(x => x.description === (text));
        }

        if (exist) {
            positive++;
            //console.log("3 " + text);
            //console.log("3 positive:" + positive);
        }
        else {
            //console.log("4 " + text);
            if (lastExist !== undefined) {
                listWords.push(lastExist.abbreviation);
            }

            exist = map.find(x => x.description === (words[i]));

            if (exist) {
                text = (words[i]).trim();
                positive = 1;
            }
            else {
                listWords.push(words[i]);
                positive = 0;
                text = '';
            }
        }
    }

    //console.log("Se ingresó: " + text);
    //console.log("Final: " + listWords.join(' '));
    return splitTextNumber(listWords.join(' '));
}

/**
 * All words
 */
const map = [
    { abbreviation: "AC", description: "AVENIDA CALLE" },
    { abbreviation: "AD", description: "ADMINISTRACION" },
    { abbreviation: "ADL", description: "ADELANTE" },
    { abbreviation: "AER", description: "AEROPUERTO" },
    { abbreviation: "AG", description: "AGENCIA" },
    { abbreviation: "AGP", description: "AGRUPACION" },
    { abbreviation: "AK", description: "AVENIDA CARRERA" },
    { abbreviation: "AL", description: "ALTILLO" },
    { abbreviation: "ALD", description: "AL LADO" },
    { abbreviation: "ALM", description: "ALMACEN" },
    { abbreviation: "AP", description: "APARTAMENTO" },
    { abbreviation: "APTDO", description: "APARTADO" },
    { abbreviation: "ATR", description: "ATRAS" },
    { abbreviation: "AUT", description: "AUTOPISTA" },
    { abbreviation: "AV", description: "AVENIDA" },
    { abbreviation: "AVIAL", description: "ANILLO VIAL" },
    { abbreviation: "BG", description: "BODEGA" },
    { abbreviation: "BL", description: "BLOQUE" },
    { abbreviation: "BLV", description: "BOULEVARD" },
    { abbreviation: "BRR", description: "BARRIO" },
    { abbreviation: "C", description: "CORREGIMIENTO" },
    { abbreviation: "CA", description: "CASA" },
    { abbreviation: "CAS", description: "CASERIO" },
    { abbreviation: "CC", description: "CENTRO COMERCIAL" },
    { abbreviation: "CD", description: "CIUDADELA" },
    { abbreviation: "CEL", description: "CELULA" },
    { abbreviation: "CEN", description: "CENTRO" },
    { abbreviation: "CIR", description: "CIRCULAR" },
    { abbreviation: "CL", description: "CALLE" },
    { abbreviation: "CLJ", description: "CALLEJON" },
    { abbreviation: "CN", description: "CAMINO" },
    { abbreviation: "CON", description: "CONJUNTO RESIDENCIAL" },
    { abbreviation: "CONJ", description: "CONJUNTO" },
    { abbreviation: "CR", description: "CARRERA" },
    { abbreviation: "CRT", description: "CARRETERA" },
    { abbreviation: "CRV", description: "CIRCUNVALAR" },
    { abbreviation: "CS", description: "CONSULTORIO" },
    { abbreviation: "DG", description: "DIAGONAL" },
    { abbreviation: "DP", description: "DEPOSITO" },
    { abbreviation: "DPTO", description: "DEPARTAMENTO" },
    { abbreviation: "DS", description: "DEPOSITO SOTANO" },
    { abbreviation: "ED", description: "EDIFICIO" },
    { abbreviation: "EN", description: "ENTRADA" },
    { abbreviation: "ES", description: "ESCALERA" },
    { abbreviation: "ESQ", description: "ESQUINA" },
    { abbreviation: "ESTE", description: "ESTE" },
    { abbreviation: "ET", description: "ETAPA" },
    { abbreviation: "EX", description: "EXTERIOR" },
    { abbreviation: "FCA", description: "FINCA" },
    { abbreviation: "GJ", description: "GARAJE" },
    { abbreviation: "GS", description: "GARAJE SOTANO" },
    { abbreviation: "GT", description: "GLORIETA" },
    { abbreviation: "HC", description: "HACIENDA" },
    { abbreviation: "HG", description: "HANGAR" },
    { abbreviation: "IN", description: "INTERIOR" },
    { abbreviation: "IP", description: "INSPECCION DE POLICIA" },
    { abbreviation: "IPD", description: "INSPECCION DEPARTAMENTAL" },
    { abbreviation: "IPM", description: "INSPECCION MUNICIPAL" },
    { abbreviation: "KM", description: "KILOMETRO" },
    { abbreviation: "LC", description: "LOCAL" },
    { abbreviation: "LM", description: "LOCAL MEZZANINE" },
    { abbreviation: "LT", description: "LOTE" },
    { abbreviation: "MD", description: "MODULO" },
    { abbreviation: "MJ", description: "MOJON" },
    { abbreviation: "MLL", description: "MUELLE" },
    { abbreviation: "MN", description: "MEZZANINE" },
    { abbreviation: "MZ", description: "MANZANA" },
    { abbreviation: "NOMBRE VIA", description: "VIAS DE NOMBRE COMUN" },
    { abbreviation: "NORTE", description: "NORTE" },
    { abbreviation: "O", description: "ORIENTE" },
    { abbreviation: "OCC", description: "OCCIDENTE" },
    { abbreviation: "OESTE", description: "OESTE" },
    { abbreviation: "OF", description: "OFICINA" },
    { abbreviation: "P", description: "PISO" },
    { abbreviation: "PA", description: "PARCELA" },
    { abbreviation: "PAR", description: "PARQUE" },
    { abbreviation: "PD", description: "PREDIO" },
    { abbreviation: "PH", description: "PENTHOUSE" },
    { abbreviation: "PJ", description: "PASAJE" },
    { abbreviation: "PL", description: "PLANTA" },
    { abbreviation: "PN", description: "PUENTE" },
    { abbreviation: "POR", description: "PORTERIA" },
    { abbreviation: "POS", description: "POSTE" },
    { abbreviation: "PQ", description: "PARQUEADERO" },
    { abbreviation: "PRJ", description: "PARAJE" },
    { abbreviation: "PS", description: "PASEO" },
    { abbreviation: "PT", description: "PUESTO" },
    { abbreviation: "PW", description: "PARK WAY" },
    { abbreviation: "RP", description: "ROUND POINT" },
    { abbreviation: "SA", description: "SALON" },
    { abbreviation: "SC", description: "SALON COMUNAL" },
    { abbreviation: "SD", description: "SALIDA" },
    { abbreviation: "SEC", description: "SECTOR" },
    { abbreviation: "SL", description: "SOLAR" },
    { abbreviation: "SM", description: "SUPER MANZANA" },
    { abbreviation: "SS", description: "SEMISOTANO" },
    { abbreviation: "ST", description: "SOTANO" },
    { abbreviation: "SUITE", description: "SUITE" },
    { abbreviation: "SUR", description: "SUR" },
    { abbreviation: "TER", description: "TERMINAL" },
    { abbreviation: "TERPLN", description: "TERRAPLEN" },
    { abbreviation: "TO", description: "TORRE" },
    { abbreviation: "TV", description: "TRANSVERSAL" },
    { abbreviation: "TZ", description: "TERRAZA" },
    { abbreviation: "UN", description: "UNIDAD" },
    { abbreviation: "UR", description: "UNIDAD RESIDENCIAL" },
    { abbreviation: "URB", description: "URBANIZACION" },
    { abbreviation: "VRD", description: "VEREDA" },
    { abbreviation: "VTE", description: "VARIANTE" },
    { abbreviation: "ZF", description: "ZONA FRANCA" },
    { abbreviation: "ZN", description: "ZONA" },
    // plus
    { abbreviation: "CL", description: "CLL" },
    { abbreviation: "CL", description: "CL" },
    { abbreviation: "CL", description: "KALLE" },
    { abbreviation: "CL", description: "KL" },
    { abbreviation: "CL", description: "CLLE" },
    { abbreviation: "CL", description: "CLE" },
    { abbreviation: "CL", description: "CALLES" },

    { abbreviation: "AV", description: "AV" },
    { abbreviation: "AV", description: "AVENIDA" },
    { abbreviation: "AV", description: "ABENIDA" },
    { abbreviation: "AV", description: "AVES" },
    { abbreviation: "AV", description: "AVENIDAS" },
    { abbreviation: "AV", description: "AB" },
    { abbreviation: "AV", description: "ABENIDAS" },
    { abbreviation: "AC", description: "AVCALLE" },
    { abbreviation: "AC", description: "AV CALLE" },
    { abbreviation: "AC", description: "AV CALE" },

    { abbreviation: "TO", description: "TO" },
    { abbreviation: "AP", description: "APTO" },
    { abbreviation: "IN", description: "INT" },
];

/**
 * Reference:
 * http://www.etnassoft.com/2011/03/03/eliminar-tildes-con-javascript/
 */
var normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }
})();

function replaceCharacters(text) {
    var finalText = String(text).replace(/[^A-Za-z 0-9 -]*/g, '')
        .replace('-', ' ')
        .replace('NO. ', '')
        .replace(' NO', '')
        .replace(/[^\x00-\x7F]/g, '')
        .replace(/ +(?= )/g, '');
    return finalText;
}

function splitTextNumber(inputText) {
    var output = [];
    var json = inputText.split(' ');
    json.forEach(function (item) {
        output = output.concat(item.split(/(\d+)/).filter(Boolean));
    });
    //console.log(output.join(' '));
    return output.join(' ').trim();
}