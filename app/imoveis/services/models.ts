
export const BairroModel = ["Parse", Parse => {
    let subClass = Parse.Object.extend("Bairro")
    Parse.defineAttributes(subClass, ["nome"])
    return subClass;
}]

export const LogradouroModel = ["Parse", Parse => {
    let subClass = Parse.Object.extend("Logradouro")
    Parse.defineAttributes(subClass, ["nome"])
    return subClass;
}]

export const QuadraModel = ["Parse", Parse => {
    let subClass = Parse.Object.extend("Quadra")
    Parse.defineAttributes(subClass, [
        "numero", "bairro", "total_lados", "total_imoveis", "total_visitas"
    ])
    return subClass
}]

export const LadoModel = ["Parse", Parse => {
    let subClass = Parse.Object.extend("Lado")
    Parse.defineAttributes(subClass, ["numero", "quadra", "logradouro"])
    return subClass
}]

export const ImovelModel = ["Parse", Parse => {
    let Imovel = Parse.Object.extend("Imovel")
    Parse.defineAttributes(Imovel, [
        "quadra", "lado", "ordem", "numero", "tipo", "habitantes",
        "caes", "gatos", "ponto_estrategico", "qrcode"
    ])
    return Imovel
}]
