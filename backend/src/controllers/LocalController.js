const connection = require('../database/connection')

module.exports = {

    async index(req, res) {

        const locais = await connection('local')
        .limit(5)
        .select(['local.*']);

        return res.json(locais)

    },

    async create(req, res) {
        const { nome, descricao, imagemCard, imagemDetail, latitude, longitude, destaque } = req.body

        const [id] = await connection('local').insert({
            nome,
            descricao,
            imagemCard,
            imagemDetail,
            latitude,
            longitude,
            destaque
        })

        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params

        await connection('local').where('id', id).delete()

        return res.status(204).send();
    }


}