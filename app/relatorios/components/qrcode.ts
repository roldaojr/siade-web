class QrCodeCtrl {
    static $inject = ["QrCodePdfService"]

    public promise
    public form
    public qtd

    constructor(protected QrCodePdfService) {
    }

    imprimir() {
        if(this.form.$invalid) return
        this.promise = this.QrCodePdfService.gerar(this.qtd)
                           .then(pdf => pdf.open())
    }
}

export const cpQrCode:ng.IComponentOptions = {
    controller: QrCodeCtrl,
    controllerAs: "$ctrl",
    templateUrl: "relatorios/components/qrcode-form.tpl.html"
}
