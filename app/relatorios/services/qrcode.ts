function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    })
    return uuid
}

export class QrCodePdfService {
    static $inject = ["$q"]
    private qtd

    constructor(protected $q) {
    }

    public gerar(qtd) {
        console.log("Gerando relatório...")
        this.qtd = Math.ceil(qtd / 3) * 3
        return this.$q((resolve, reject) => {
            setTimeout(() => {
                let doc = this.docDefinition(this.gerar_pagina())
                resolve(pdfMake.createPdf(doc))
            }, 100)
        })
    }

    private gerar_pagina() {
        let qrcodes = this.gerar_qcodes()
        let cols = []
        for(let i = 0; i < this.qtd; i = i + 3) {
            cols.push({columns: qrcodes.slice(i, i+3)})
        }
        return cols
    }

    private gerar_qcodes() {
        let qrcodes = []
        for(let i = 0; i < this.qtd; i++) {
            qrcodes.push({qr: generateUUID(), margin: 10})
        }
        return qrcodes
    }

    private docDefinition(content) {
        return {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [40, 40, 40, 40],
            content: content
        }
    }
}
