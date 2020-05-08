const connection = require('../database/connection')

module.exports = {

    async index(req, res) {
        const locais = await connection('local')
        .select(['local.*']);
        
        return res.json(locais)
    },

    async destaques(req, res) {
        const destaques = await connection('local')
        .select(['local.*'])
        .where('destaque', true)

        return res.json(destaques)
    },

    async trending(req, res) {
        const trending = await connection('local')
        .select(['local.*'])
        .where('trending', true)

        return res.json(trending)
    },

    async create(req, res) {
        const { nome, descricao, imagemCard, imagemDetail, latitude, longitude, destaque, emAlta, favorito } = req.body

        const [id] = await connection('local').insert({
            nome,
            descricao,
            imagemCard,
            imagemDetail,
            latitude,
            longitude,
            destaque,
            emAlta,
            favorito
        })

        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params

        await connection('local').where('id', id).delete()

        return res.status(204).send();
    },

    async favoritos(req, res) {
        const favoritos = await connection('local')
        .limit(5)
        .where('favorito', true)
        .select(['local.*']);

        return res.json(favoritos)
    },

    async alteraFavorito(req, res){
        const local_id = req.body.local_id

        const local_favorito = await connection('local').select('favorito').where('id', local_id)
        if(local_favorito[0].favorito === 0){ 
            await connection('local').update('favorito', true).where('id', local_id)
            return res.json(1);       
        }
        else {
            await connection('local').update('favorito', false).where('id', local_id)
            return res.json(0);
        }
    }


}