let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner }) => {
	let user = global.db.data.users[m.sender]
	if (user.joinlimit == 0) throw 'Limit Join anda sudah habis! (0 / 1)'
    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw '🗳️ Hay member premium, Masukin link nya...'
    let res = await conn.groupAcceptInvite(code)
    let expiredd = 25920000
    expired = Math.floor(Math.min(1, Math.max(1, isOwner ? isNumber(expired) ? parseInt(expired) : 0 : 3)))
user.joinlimit -= 1
    m.reply(`✔️ Join Premium Berhasil ${res}\n📛 BOT AKAN KELUAR DALAM 3 HARI`)
    m.reply(`(${user.joinlimit}/1) Limit For Using Join`)
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
}
handler.help = ['joinpremium']
handler.tags = ['info','main','premium']
handler.premium = true
handler.private = true
handler.limit = false

handler.command = /^joinpremium$/i

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))