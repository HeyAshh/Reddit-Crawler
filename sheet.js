const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('');
    }
    async load() {
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo();
    }
    async addSheet(name){
        await doc.addSheet({ title });
    }

    async addRows(rows, i) { 
        const sheet = this.doc.sheetsByIndex[i];
        await sheet.addRows(rows);
    }
    async getRows(i){
        const sheet = this.doc.sheetsByIndex[i];
        const rows = await sheet.getRows();
        return rows;
    }
}
